"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { Bold, Italic, Heading1, Heading2, Heading3, List, Users, Share2 } from 'lucide-react';
import SlashCommandMenu from './SlashCommandMenu ';
import { useState, useEffect, useRef } from 'react';
import { useAI } from '@/hooks/useAI';

const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const getUserName = () => `User-${Math.floor(Math.random() * 1000)}`;

// Configuration for WebRTC
const SIGNALING_SERVERS = [
  "wss://signaling.yjs.dev",
  "wss://y-webrtc-signaling-eu.herokuapp.com",
  "wss://y-webrtc-signaling-us.herokuapp.com"
];

// Free STUN servers
const ICE_SERVERS = [
  {
    urls: [
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun3.l.google.com:19302',
      'stun:stun4.l.google.com:19302',
    ],
  },
  // Free TURN servers - you can add more from https://gist.github.com/sagivo/3a4b2f2c7ac6e1b5267c2f1f59ac6c6b
  {
    urls: ['turn:openrelay.metered.ca:80'],
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
];

const Editor = () => {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const { performAIAction, isLoading, error } = useAI();
  const [status, setStatus] = useState('Initializing...');
  const [userCount, setUserCount] = useState(1);
  const [roomId, setRoomId] = useState('');
  
  const ydocRef = useRef(null);
  const providerRef = useRef(null);
  const persistenceRef = useRef(null);

  // Create editor configuration
  const editorConfig = {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Start collaborating! 🚀</p>",
    onUpdate: ({ editor }) => {
      const { state } = editor;
      const { selection } = state;
      const { $anchor } = selection;
      const currentLineText = $anchor.nodeBefore?.textContent || '';

      if (currentLineText.endsWith('/')) {
        const { top, left } = editor.view.coordsAtPos($anchor.pos);
        const editorElement = document.querySelector('.ProseMirror');
        const editorRect = editorElement?.getBoundingClientRect();
        
        if (editorRect) {
          setMenuPosition({
            top: top - editorRect.top + 24,
            left: left - editorRect.left
          });
          setShowSlashMenu(true);
        }
      } else {
        setShowSlashMenu(false);
      }
    },
  };

  // Initialize editor with collaboration features
  const editor = useEditor({
    ...editorConfig,
    extensions: [
      ...editorConfig.extensions,
      ...(ydocRef.current ? [
        Collaboration.configure({
          document: ydocRef.current,
          field: 'content',
        }),
        CollaborationCursor.configure({
          provider: providerRef.current,
          user: {
            name: getUserName(),
            color: getRandomColor(),
          },
        }),
      ] : []),
    ],
  });

  // Initialize room ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let currentRoomId = params.get('room');
    
    if (!currentRoomId) {
      currentRoomId = Math.random().toString(36).substring(2, 15);
      params.set('room', currentRoomId);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
    
    setRoomId(currentRoomId);
  }, []);

  // Initialize Yjs and providers
  useEffect(() => {
    if (!roomId) return;

    try {
      // Create new instances
      ydocRef.current = new Y.Doc();
      
      // Configure WebRTC with public signaling and STUN/TURN servers
      providerRef.current = new WebrtcProvider(`realtime-editor-${roomId}`, ydocRef.current, {
        signaling: SIGNALING_SERVERS,
        filterBcConns: false,
        peerOpts: {
          config: {
            iceServers: ICE_SERVERS
          }
        }
      });

      // Add connection status monitoring
      providerRef.current.on('status', ({ status }) => {
        switch (status) {
          case 'connected':
            setStatus('Connected');
            break;
          case 'disconnected':
            setStatus('Disconnected - trying to reconnect...');
            break;
          case 'connecting':
            setStatus('Connecting...');
            break;
        }
      });

      persistenceRef.current = new IndexeddbPersistence(`realtime-editor-${roomId}`, ydocRef.current);

      // Set up awareness handler
      const handleAwarenessUpdate = () => {
        if (providerRef.current) {
          const states = Array.from(providerRef.current.awareness.states.values());
          setUserCount(Math.max(1, states.length));
        }
      };

      providerRef.current.awareness.setLocalState({
        user: {
          name: getUserName(),
          color: getRandomColor(),
        }
      });

      providerRef.current.on('awareness', handleAwarenessUpdate);

      // Add connection error handling
      providerRef.current.on('error', (error) => {
        console.error('Connection error:', error);
        setStatus('Connection error - trying to reconnect...');
      });

      persistenceRef.current = new IndexeddbPersistence(`realtime-editor-${roomId}`, ydocRef.current);

      persistenceRef.current.once('synced', () => {
        setStatus('Connected');
      });

      // Force editor to reinitialize with collaboration features
      if (editor) {
        editor.destroy();
      }

    } catch (err) {
      console.error('Failed to initialize collaboration:', err);
      setStatus('Connection failed');
    }

    return () => {
      try {
        if (providerRef.current) {
          providerRef.current.off('awareness');
          providerRef.current.disconnect();
          providerRef.current.destroy();
          providerRef.current = null;
        }
        if (persistenceRef.current) {
          persistenceRef.current.destroy();
          persistenceRef.current = null;
        }
        if (ydocRef.current) {
          ydocRef.current.destroy();
          ydocRef.current = null;
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    };
  }, [roomId]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-gray-600">{status}</div>
      </div>
    );
  }

  const shareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Collaboration link copied to clipboard!');
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <Toolbar editor={editor} />
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Users size={20} className="mr-2" />
            <span>{userCount} user{userCount !== 1 ? 's' : ''} connected</span>
          </div>
          <button onClick={shareLink} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            <Share2 size={20} className="mr-2" />
            Share Link
          </button>
        </div>
      </div>

      <div className={`mb-4 px-4 py-2 rounded-md ${status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {status}
      </div>

      <EditorContent 
        className="min-h-[300px] max-h-[600px] overflow-y-auto bg-white rounded-lg p-5 my-5 border shadow-sm" 
        editor={editor} 
      />

      {showSlashMenu && (
        <div style={{
          position: 'absolute',
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          zIndex: 50
        }}>
          <SlashCommandMenu editor={editor} onAIAction={performAIAction} />
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white">Processing AI request...</div>
        </div>
      )}
    </div>
  );
};

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 p-2 bg-white border-b-2 border-gray-200 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        <Italic size={20} />
      </button>
      {/* Add other toolbar buttons similarly */}
    </div>
  );
};

export default Editor;
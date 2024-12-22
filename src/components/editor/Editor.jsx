"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Bold, Italic, Heading1, Heading2, Heading3,List} from 'lucide-react';
import SlashCommandMenu from './SlashCommandMenu ';
import { useState } from 'react';
import { useAI } from '@/hooks/useAI';

const Editor = () => {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const { performAIAction, isLoading, error } = useAI();

  const editor = useEditor({
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
    extensions: [
      StarterKit,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Hello World!! 🌎️</p>",
    onUpdate: ({ editor }) => {
      const { state } = editor;
      const { selection } = state;
      const { $anchor } = selection;
      const currentLineText = $anchor.nodeBefore?.textContent || '';

      if (currentLineText.endsWith('/')) {
        const { top, left } = editor.view.coordsAtPos($anchor.pos);
        setMenuPosition({ top, left });
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    },
  });

  const handleAIAction = async (action) => {
    if (!editor) return;

    const content = editor.getHTML();
    let result;

    if (action === 'enhance') {
      const template = prompt('Enter the writing style (e.g., "formal", "casual", "technical"):');
      const creativity = parseFloat(prompt('Enter the creativity level (0.0 to 1.0):') || '0.5');
      
      if (template && !isNaN(creativity) && creativity >= 0 && creativity <= 1) {
        result = await performAIAction(content, action, template, creativity);
      } else {
        alert('Invalid input. Please try again.');
        return;
      }
    } else {
      result = await performAIAction(content, action);
    }

    if (result) {
      editor.commands.setContent(result);
    }
  };

  return (
    <div className="relative">
      <Toolbar editor={editor} />
      <EditorContent immediatelyrender={"true"} className="h-[80vh] bg-slate-50 rounded-lg p-5 my-5 border" editor={editor} />
      {showSlashMenu && (
        <div style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left }}>
          <SlashCommandMenu editor={editor} onAIAction={handleAIAction} />
        </div>
      )}
      {isLoading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-white">Processing AI request...</div>
      </div>}
      {error && <div className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded">{error}</div>}
    </div>
  );
};

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #f0f0f0',
        borderRadius: '8px',
      }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <Heading1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <Heading2 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <Heading3 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={{ ...buttonStyle }}
        className="toolbar-button"
      >
        <List size={20} />
      </button>
    </div>
  );
};

export default Editor;




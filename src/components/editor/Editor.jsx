"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Heading1, Heading2, Heading3 } from 'lucide-react';

const Editor = () => {
  const editor = useEditor({
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
    extensions: [
      StarterKit
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

 

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent immediatelyrender={"true"} className="h-[80vh] bg-slate-50 rounded-lg p-5 my-5 border" editor={editor} />
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

  const buttonHoverStyle = {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    transform: 'scale(1.1)',
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
    </div>
  );
};



export default Editor



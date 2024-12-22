"use client"
import './styles.css'
import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'
import SlashCommandMenu from './SlashCommandMenu'
import { useSearchParams } from 'next/navigation'

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('tiptap-collaboration-cursor-extension', ydoc)

const Editor = ({ onAIAction }) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const params = useSearchParams()
  const name = params.get("name")

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: name,
          color: '#f783ac',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something … It’ll be shared with everyone else looking at this example.',
      }),
    ],
    content: "<p>Hello World!! 🌎️</p>",
    onUpdate: ({ editor }) => {
      const { state } = editor
      const { selection } = state
      const { $anchor } = selection
      const currentLineText = $anchor.nodeBefore?.textContent || ''

      // Show slash menu when '/' is typed
      if (currentLineText.endsWith('/')) {
        const { top, left } = editor.view.coordsAtPos($anchor.pos)
        setMenuPosition({ top, left })
        setShowSlashMenu(true)
      } else {
        setShowSlashMenu(false)
      }
    },
  })

  useEffect(() => {
    if (editor) {
      const { state } = editor
      const { selection } = state
      const { $anchor } = selection

      // Close menu if the user clicks outside
      const handleClickOutside = (e) => {
        if (editor.view.dom.contains(e.target)) return
        setShowSlashMenu(false)
      }

      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [editor])

  return (
    <div className="relative">
      <EditorContent
        editor={editor}
        className="h-[80vh] bg-slate-50 rounded-lg p-5 my-5 border"
      />
      {showSlashMenu && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 10,
          }}
        >
          <SlashCommandMenu editor={editor} onAIAction={onAIAction} />
        </div>
      )}
    </div>
  )
}

export default Editor

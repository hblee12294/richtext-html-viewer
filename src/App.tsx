import { useRef, useEffect, useState, useCallback } from 'react'
import Quill from 'quill'

import './App.css'
import { CodeEditor, Toolbar } from './components'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike', { script: 'sub' }, { script: 'super' }], // toggled buttons

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ list: 'ordered' }, { list: 'bullet' }],

  ['blockquote', 'code-block', 'link', 'image'],

  ['clean'], // remove formatting button
]

function App() {
  const quillContainerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill>()

  const [htmlContent, setHTMLContent] = useState('')
  const [stats, setStats] = useState({ charCount: 0, wordCount: 0 })

  useEffect(() => {
    if (!quillContainerRef.current || quillRef.current) return

    const quill = new Quill(quillContainerRef.current, {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: 'Type here ...',
      theme: 'snow', // or 'bubble'
    })

    const updateContent = () => {
      setHTMLContent(quill.root.innerHTML)
      const text = quill.getText()
      // quill.getText() always returns a newline at the end, so we trim it for accurate count
      const trimmedText = text.replace(/\n$/, '')
      setStats({
        charCount: trimmedText.length,
        wordCount: trimmedText.trim().length > 0 ? trimmedText.trim().split(/\s+/).length : 0,
      })
    }

    quill.on('text-change', updateContent)

    quillRef.current = quill
  }, [])

  const onCodeEditorChange = useCallback((value: string) => {
    const quill = quillRef.current
    if (!quill) return

    quill.enable(false)
    quill.clipboard.dangerouslyPasteHTML(value, 'silent')
    quill.enable(true)
  }, [])

  const handleClear = () => {
    if (quillRef.current) {
      quillRef.current.setText('')
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([htmlContent], { type: 'text/html' })
    element.href = URL.createObjectURL(file)
    element.download = 'index.html'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (quillRef.current && content) {
        quillRef.current.clipboard.dangerouslyPasteHTML(content)
      }
    }
    reader.readAsText(file)
  }

  const [isPreview, setIsPreview] = useState(false)
  const [leftWidth, setLeftWidth] = useState(50) // Percentage
  const isDragging = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return
    const newLeftWidth = (e.clientX / window.innerWidth) * 100
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [handleMouseMove])

  return (
    <div className="wrap">
      <div className="editor" style={{ width: `${leftWidth}%` }}>
        <Toolbar
          onClear={handleClear}
          onDownload={handleDownload}
          onUpload={handleUpload}
          onPreviewToggle={setIsPreview}
          isPreview={isPreview}
          charCount={stats.charCount}
          wordCount={stats.wordCount}
        />
        <div className="quill-container" ref={quillContainerRef}></div>
      </div>

      <div className="resizer" onMouseDown={handleMouseDown}></div>

      <div className="display" style={{ width: `${100 - leftWidth}%` }}>
        {isPreview ? (
          <div
            className="preview-container"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <CodeEditor value={htmlContent} onChange={onCodeEditorChange}></CodeEditor>
        )}
      </div>
    </div>
  )
}

export default App

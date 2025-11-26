import React from 'react'
import './Toolbar.css'
import { Button } from '../Button/Button'

interface ToolbarProps {
    onClear: () => void
    onDownload: () => void
    onUpload: (file: File) => void
    onPreviewToggle: (isPreview: boolean) => void
    isPreview: boolean
    charCount: number
    wordCount: number
}

export const Toolbar: React.FC<ToolbarProps> = ({
    onClear,
    onDownload,
    onUpload,
    onPreviewToggle,
    isPreview,
    charCount,
    wordCount,
}) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onUpload(file)
        }
        // Reset input so same file can be selected again
        event.target.value = ''
    }

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <Button onClick={onClear}>Clear</Button>
                <Button onClick={onDownload}>Download</Button>
                <div className="upload-btn-wrapper">
                    <Button onClick={() => document.getElementById('file-upload')?.click()}>
                        Upload
                    </Button>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".html,.txt"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <Button onClick={() => onPreviewToggle(!isPreview)}>
                    {isPreview ? 'Show Code' : 'Show Preview'}
                </Button>
            </div>
            <div className="toolbar-stats">
                <span>Chars: {charCount}</span>
                <span>Words: {wordCount}</span>
            </div>
        </div>
    )
}

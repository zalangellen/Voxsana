export default function DropZone({ id, inputId, accept, multiple, filled, onFiles, children }) {
  const handleDrop = (e) => {
    e.preventDefault()
    const files = [...e.dataTransfer.files]
    if (files.length) onFiles(files)
  }

  return (
    <div
      className={`drop-zone ${filled ? 'filled' : ''}`}
      id={id}
      onClick={() => document.getElementById(inputId)?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
      <input
        type="file"
        id={inputId}
        accept={accept}
        multiple={multiple}
        onChange={(e) => { onFiles([...e.target.files]); e.target.value = '' }}
      />
    </div>
  )
}

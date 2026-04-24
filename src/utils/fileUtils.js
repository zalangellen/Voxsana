export function getFileType(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif'].includes(ext)) return 'image'
  if (ext === 'pdf') return 'pdf'
  if (['doc', 'docx'].includes(ext)) return 'docx'
  return 'txt'
}

export function extractContent(file) {
  return new Promise((resolve) => {
    const ftype = getFileType(file.name)
    const isImage = ftype === 'image'
    const reader = new FileReader()

    if (isImage) {
      reader.onload = (e) => resolve({ extracted: e.target.result, status: 'ok', isImage: true })
      reader.onerror = () => resolve({ extracted: '', status: 'warn', isImage: true })
      reader.readAsDataURL(file)
    } else {
      reader.onload = (e) => {
        const clean = e.target.result.replace(/[^\x20-\x7E\n\r\tÀ-ɏ]/g, ' ').trim()
        resolve({
          extracted: clean.length > 30 ? clean : `[Binary: ${file.name}]`,
          status: clean.length > 30 ? 'ok' : 'warn',
          isImage: false,
        })
      }
      reader.onerror = () => resolve({ extracted: `[Error: ${file.name}]`, status: 'warn', isImage: false })
      reader.readAsText(file)
    }
  })
}

export async function processFile(file, type) {
  const ftype = getFileType(file.name)
  const { extracted, status, isImage } = await extractContent(file)
  return { file, name: file.name, ftype, extracted, status, isImage }
}

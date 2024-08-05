import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { XIcon, ArrowUpIcon } from '@heroicons/react/outline'
import axios from 'axios'

interface DropzoneProps {
  image_urls: string[]
  addImage: (url: string[]) => void
  removeImage: (url: string) => void
}

const Dropzone: React.FC<DropzoneProps> = ({
  image_urls,
  addImage,
  removeImage,
}) => {
  const [uploading, setUploading] = useState<boolean>(false)
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const formData = new FormData()
        acceptedFiles.forEach((file) => {
          formData.append('img', file)
        })

        setUploading(true)
        axios
          .post('http://localhost:3000/gallery/upload', formData)
          .then((response) => {
            addImage(response.data)
          })
          .catch((error) => {
            console.error('Error:', error)
          })
          .finally(() => {
            setUploading(false)
          })
      }
    },
    [addImage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 20000,
    onDrop,
  })

  return (
    <form>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4 border border-white rounded-xl p-20 cursor-pointer'>
          <ArrowUpIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <span className='title text-lg font-semibold mt-10 pb-3'>
          Uploaded images
        </span>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {uploading && (
            <li className='relative h-32 rounded-md shadow-lg flex items-center justify-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
            </li>
          )}
          {image_urls?.map((url, index) => (
            <li key={index} className='relative h-32 rounded-md shadow-lg'>
              <img
                src={url}
                width={100}
                height={100}
                // onLoad={() => {
                //   URL.revokeObjectURL(file.preview)
                // }}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeImage(url)}
              >
                <XIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
              {/* <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p> */}
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default Dropzone

import { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from '../../common/DataTable'
import { SketchPicker } from 'react-color'
import { DateTimeFormat } from '../../common/DateTimeFormat'

interface Color {
  id: number
  name: string
  hex: string
  created_at: Date
  updated_at: Date
}

const AllColor = () => {
  const [name, setName] = useState<string>('')
  const [colors, setColors] = useState<Color[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const [currentColor, setCurrentColor] = useState<string>('#000000')
  const [refreshKey, setRefreshKey] = useState<number>(0)

  const columns = [
    { name: 'Id', element: (row: any) => row.id },
    { name: 'Name', element: (row: any) => row.name },
    { name: 'Hex', element: (row: any) => row.hex },
    {
      name: 'Created at',
      element: (row: any) => DateTimeFormat(row.created_at),
    },
    {
      name: 'Updated at',
      element: (row: any) => DateTimeFormat(row.updated_at),
    },
    {
      name: 'Action',
      element: () => (
        <>
          <button className='btn btn-sm btn-ghost'>Edit</button>
          <button className='btn btn-sm btn-error'>Delete</button>
        </>
      ),
    },
  ]
  useEffect(() => {
    const query = `?search=${search}&items_per_page=${itemsPerPage}&page=${currentPage}`
    axios
      .get(`http://localhost:3000/variant/color${query}`)
      .then((res) => {
        setColors(res.data.data)
        setNumOfPages(res.data.lastPage)
        if (res.data.currentPage > res.data.lastPage) setCurrentPage(1)
        else setCurrentPage(res.data.currentPage)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentPage, search, itemsPerPage, refreshKey])

  const handleAdd = () => {
    const modal = document.getElementById(
      'add_color_modal'
    ) as HTMLDialogElement
    modal?.showModal()
  }

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3000/variant/color/add', {
        name: name,
        hex: currentColor,
      })
      setName('')
      setRefreshKey(refreshKey + 1)
      const modal = document.getElementById(
        'add_color_modal'
      ) as HTMLDialogElement
      modal?.close()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <DataTable
        name='All Color'
        data={colors}
        columns={columns}
        numOfPages={numOfPages}
        currentPage={currentPage}
        onChangePage={(page: number) => setCurrentPage(page)}
        onChangeItemsPerPage={(itemsPerPage: number) =>
          setItemsPerPage(itemsPerPage)
        }
        onTypingSearch={(search: string) => setSearch(search)}
        onAdd={handleAdd}
      />

      <dialog id='add_color_modal' className='modal w-100'>
        <div className='modal-box w-11/12 max-w-xl'>
          <h2 className='text-2xl font-bold mb-4'>Add Color</h2>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <label className='form-control w-full'>
            <div className='flex gap-4 justify-around'>
              <div className='w-full'>
                <label className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>Name</span>
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    className='input input-bordered w-full'
                  />
                </label>
                <div className='label'>
                  <span className='label-text'>Color hex code</span>
                </div>

                <input
                  type='text'
                  className='input input-bordered w-full'
                  disabled
                  value={currentColor}
                />
              </div>

              <div className='ml-3'>
                <SketchPicker
                  color={currentColor}
                  onChange={(color) => setCurrentColor(color.hex)}
                />
              </div>
            </div>
          </label>

          <div className='flex justify-end mt-5'>
            <button onClick={() => handleSave()} className='btn btn-primary'>
              Lưu
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AllColor

import { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from '../../common/DataTable'
import { DateTimeFormat } from '../../common/DateTimeFormat'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: number
  name: string
  SKU: string
  image_urls: string[]
  created_at: Date
  updated_at: Date
}
const AllProduct = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [refreshKey, setRefreshKey] = useState<number>(0)

  const columns = [
    { name: 'Id', element: (row: any) => row.id },
    { name: 'Name', element: (row: any) => row.name },
    { name: 'SKU', element: (row: any) => row.SKU },
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
      .get(`http://localhost:3000/product${query}`)
      .then((res) => {
        setProducts(res.data.data)
        setNumOfPages(res.data.lastPage)
        if (res.data.currentPage > res.data.lastPage) setCurrentPage(1)
        else setCurrentPage(res.data.currentPage)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentPage, itemsPerPage, search, refreshKey])

  const handleAdd = () => {
    navigate('/add-product')
  }
  return (
    <div>
      <DataTable
        name='All Color'
        data={products}
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
    </div>
  )
}

export default AllProduct

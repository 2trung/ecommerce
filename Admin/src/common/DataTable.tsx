import { SearchIcon, PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'

const DataTable = (prop: any) => {
  const [keyword, setKeyword] = useState('')
  const {
    name,
    data,
    columns,
    currentPage,
    numOfPages,
    onChangePage,
    onChangeItemsPerPage,
    onTypingSearch,
    onAdd,
  } = prop

  const renderHead = () => {
    return columns.map((column: any) => (
      <th key={column.name}>{column.name}</th>
    ))
  }
  const renderData = () => {
    return data.map((row: any) => (
      <tr key={row.id} className='hover'>
        <td>
          <label>
            <input type='checkbox' className='checkbox' />
          </label>
        </td>
        {columns.map((column: any) => (
          <td key={column.name}>{column.element(row)}</td>
        ))}
      </tr>
    ))
  }
  const renderPagination = () => {
    const pagination = []
    const nextPage = currentPage + 1 > numOfPages ? null : currentPage + 1
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1

    pagination.push(
      <button
        key='prev'
        onClick={() => onChangePage(prevPage)}
        className='btn btn-ghost btn-outline'
        disabled={prevPage === null}
      >
        &laquo;
      </button>
    )
    for (let i = 1; i <= numOfPages; i++) {
      pagination.push(
        <button
          key={i}
          onClick={() => onChangePage(i)}
          className={
            i === currentPage
              ? 'join-item btn btn-ghost btn-outline'
              : 'join-item btn btn-outline'
          }
          disabled={i === currentPage}
        >
          {i}
        </button>
      )
    }
    pagination.push(
      <button
        key='next'
        onClick={() => onChangePage(nextPage)}
        className='btn btn-ghost btn-outline'
        disabled={nextPage === null}
      >
        &raquo;
      </button>
    )
    return pagination
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onTypingSearch(keyword)
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [keyword])

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-between items-center mb-5'>
        <div className='flex-grow text-center'>
          <h1 className='text-xl font-bold'>{name}</h1>
        </div>
        <div className='flex-none'>
          <button className='btn' onClick={() => onAdd()}>
            <PlusIcon className='h-5 w-5' />
            Add
          </button>
        </div>
      </div>

      <div className='flex justify-between mb-5 items-center overflow-x-auto text-center gap-10'>
        <div className='flex items-center gap-2'>
          <span>Showing</span>
          <select
            onChange={(e) => onChangeItemsPerPage(e.target.value)}
            className='select select-bordered w-full min-w-16'
          >
            <option>1</option>
            <option>5</option>
            <option selected>10</option>
          </select>
          <span>entries</span>
        </div>

        <label className='input input-bordered flex items-center'>
          <input
            type='text'
            placeholder='Search'
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon className='h-5 w-5' />
        </label>
      </div>

      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type='checkbox' className='checkbox' />
              </label>
            </th>
            {renderHead()}
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
        <tfoot>
          <tr>
            <th>
              <label>
                <input type='checkbox' className='checkbox' />
              </label>
            </th>
            {renderHead()}
          </tr>
        </tfoot>
      </table>
      {numOfPages > 1 && (
        <div className='flex mt-5 justify-center gap-2'>
          {renderPagination()}
        </div>
      )}
    </div>
  )
}

export default DataTable

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar bg-[#111111]'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a>Product</a>
              <ul className='p-2'>
                <li>
                  <Link to={'/add-product'}>Add product</Link>
                </li>
                <li>
                  <Link to={'/all-product'}>All product</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to={'/color'}>Color</Link>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost text-xl'>Admin</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <details>
              <summary>Product</summary>
              <ul className='p-2'>
                <li>
                  <Link to={'/add-product'}>Add product</Link>
                </li>
                <li>
                  <Link to={'/all-product'}>All product</Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link to={'/color'}>Color</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <a className='btn'>Avatar here</a>
      </div>
    </div>
  )
}

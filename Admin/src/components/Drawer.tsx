import { CogIcon } from '@heroicons/react/outline'
import { Router, Link } from 'react-router-dom'

export const Drawer = ({ content }: { content: any }) => {
  return (
    <div className='flex-row'>
      {/* Drawer */}
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col '>
          {content}
          {/* <label
            htmlFor='my-drawer-2'
            className='btn btn-primary drawer-button lg:hidden'
          >
            Open drawer
          </label> */}
        </div>
        <div className='flex drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            <li>
              <p>Product</p>
            </li>
            <li>
              <p>Product</p>
            </li>
            <li>
              <p>Product</p>
            </li>
            <li>
              <p>Product</p>
            </li>
            <li>
              <details open>
                <summary>
                  <CogIcon className='w-6 h-6 mr-2' />
                  Khác
                </summary>
                <ul>
                  <li>
                    <p>Product</p>{' '}
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

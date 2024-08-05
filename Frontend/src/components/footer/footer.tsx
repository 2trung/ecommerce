import {
  CiHeadphones,
  CiRepeat,
  CiCreditCard1,
  CiDeliveryTruck,
} from 'react-icons/ci'

import visa from '../../assets/visa.svg'
import amex from '../../assets/amex.svg'
import mastercard from '../../assets/mastercard.svg'
import discover from '../../assets/discover.svg'
import unionpay from '../../assets/unionpay.svg'
import paypal from '../../assets/paypal.svg'
import klarna from '../../assets/klarna.svg'
import applepay from '../../assets/applepay.svg'
import fedex from '../../assets/fedex.svg'

const Footer = () => {
  return (
    <div>
      <div className='bg-white grid md:grid-cols-4 grid-cols-2 px-[5%] py-5 gap-y-10 text-center border border-t-[#E5E5E5]'>
        <div className='flex flex-col justify-center items-center text-black'>
          <CiHeadphones className='w-[30px] h-[30px]' />
          <span>Contact us</span>
        </div>
        <div className='flex flex-col justify-center items-center text-black'>
          <CiRepeat className='w-[30px] h-[30px]' />
          <span>Free return</span>
        </div>
        <div className='flex flex-col justify-center items-center text-black'>
          <CiCreditCard1 className='w-[30px] h-[30px]' />
          <span>Safe & Secure Payment</span>
        </div>
        <div className='flex flex-col justify-center items-center text-black'>
          <CiDeliveryTruck className='w-[30px] h-[30px]' />
          <span>Shipping</span>
        </div>
      </div>
      <div className='sm:flex flex-row justify-between bg-[#F4F4F4] py-14 px-10 gap-10'>
        <div className='flex flex-col sm:w-[50%] text-black'>
          <span>
            Want exclusive offers & first access to products? Sign up.
          </span>
          <div className='flex justify-between items-center text-center h-20'>
            <span className='w-[30%]'>Email address</span>

            <input
              type='email'
              placeholder='Your email address'
              className='border-none outline-none w-[70%] p-6 text-lg bg-white'
            />
          </div>
          <button className='bg-black text-white p-6'>Sign up</button>
        </div>
        <div className='flex flex-row justify-around md:gap-20 gap-10 mt-10 sm:mt-0 bg-[#F4F4F4] text-black'>
          <div className='flex flex-col'>
            <span>ABOUT US</span>
            <a>Shop club</a>
            <a>Careers</a>
            <a>Military Discount</a>
            <a>Digital Accessibility</a>
            <a>Brand Protection</a>
            <a>FAQ</a>
          </div>

          <div className='flex flex-col'>
            <span>CATEGORIES</span>
            <a>Men's Collection</a>
            <a>Polo Shop</a>
            <a>Military Discount</a>
            <a>Shoe Shop</a>
            <a>Sport</a>
            <a>Bag</a>
          </div>

          <div className='lg:flex hidden flex-col max-w-[30%]'>
            <span>HELP & CONTACTS</span>
            <a>By phone</a>
            <a>+1-234-567-8999</a>
            <a>
              Contact us Monday through Friday from 9 am to 11 pm EST, and
              Saturday and Sunday from 10 am to 9 pm EST. By email and by chat
            </a>
            <a>FAQ</a>
          </div>
        </div>
      </div>

      <div className='bg-black grid lg:grid-cols-9 sm:grid-cols-4 grid-cols-3 items-stretch'>
        <img src={visa} alt='logo' />
        <img src={amex} alt='logo' />
        <img src={mastercard} alt='logo' />
        <img src={discover} alt='logo' />
        <img src={unionpay} alt='logo' />
        <img src={paypal} alt='logo' />
        <img src={klarna} alt='logo' />
        <img src={applepay} alt='logo' />
        <img src={fedex} alt='logo' />
      </div>
    </div>
  )
}

export default Footer

import { CiDeliveryTruck } from 'react-icons/ci'
import { useState, useEffect, useRef } from 'react'

const Carousel = () => {
  const [position, setPosition] = useState(0)
  const [justifyContent, setJustifyContent] = useState('justify-center')
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const items = [
    "Father's Day - 15% off for orders of 2 products, 20% off for orders of 3 products.",
    <span className='flex gap-2 justify-center items-center'>
      <CiDeliveryTruck /> Free standard delivery for orders from $100
    </span>,
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
      setPosition(0)
    }, 5000)

    return () => clearInterval(interval)
  }, [items.length])

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 0
    const textWidth = textRef.current?.clientWidth || 0

    if (textWidth > containerWidth) {
      setJustifyContent('justify-start')
      const interval = setInterval(() => {
        setPosition((prevPosition) => {
          return prevPosition <= -textWidth ? containerWidth : prevPosition - 1
        })
      }, 40)

      return () => clearInterval(interval)
    }
    setJustifyContent('justify-center')
  }, [currentIndex])

  return (
    <div
      ref={containerRef}
      className={`relative px-3 overflow-hidden w-full h-11 bg-black flex items-center ${justifyContent}`}
    >
      <div
        ref={textRef}
        className='absolute'
        style={{
          whiteSpace: 'nowrap',
          transform: `translateX(${position}px)`,
        }}
      >
        <span className='text-xs text-white'>{items[currentIndex]}</span>
      </div>
    </div>
  )
}

export default Carousel

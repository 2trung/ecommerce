import { useState } from 'react'

const DebounceSearch = () => {
  const [keyword, setKeyword] = useState('')
  const onTyping = (e: any) => {
    console.log(e.target.value)
    setKeyword(e.target.value)
  }

  return <></>
}

export default DebounceSearch

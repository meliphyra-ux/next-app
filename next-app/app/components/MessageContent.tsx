'use client'
import { useState } from "react"

export const MessageContent = () => {
  const [butterbroad, setButterBroad] = useState(false)
  return <div>
    <p>Дати бутерброда?</p>
    <button onClick={() => setButterBroad(state => !state)}>{butterbroad ? 'Віддай суко' : 'Дати'}</button>
    {butterbroad && <img src='/images.jpg' />}
  </div>
}

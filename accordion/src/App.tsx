import { useState } from 'react'
import './App.css'
import { data } from './data'
interface AccordionProps {
  item: {
    que: string,
    ans: string
  },
  index: number,
  openIndexes: number[],
  toggleAction:(index:number)=>void
}
function App() {
  const [mulAcc, setMulAcc] = useState<boolean>(false)
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  function toggleAction(index: number) {
    if (mulAcc) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
      )
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (

    <div className="flex flex-col items-center my-8 h-screen">
      <div>
        <span className='mx-2'>Is multiple open accordion allowed?</span><input type='checkbox' onChange={() => setMulAcc(!mulAcc)} checked={mulAcc} />
      </div>
      <div>

      </div>
      {
        data.map((item, index) => (
          <Accordion
            item={item}
            index={index}
            openIndexes={openIndexes}
            toggleAction={toggleAction}
          />
        ))

      }
    </div>

  )
}

const Accordion = ({ item, index, openIndexes, toggleAction }:AccordionProps) => {
  return (
    <div key={index} className='border w-[850px] h-auto m-2 p-4 border-gray-200 flex  flex-col'>
      <div className='flex'>
        <p className='flex-1 font-bold text-lg'>{item.que}</p>
         <div className="cursor-pointer bg-slate-500 rounded-full h-6 w-6 flex justify-center items-center" onClick={() => toggleAction(index)} >{openIndexes.includes(index) ? "-" : "+"}</div>
      </div>
      {openIndexes.includes(index) &&
        <div>{item.ans}</div>
        
      }
    </div>
  )
}
export default App

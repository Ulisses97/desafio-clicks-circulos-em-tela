import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number,
  clientY: number,
}

function App() {

  const [clicks, setClicks] = useState<ClickedProps[]>([])
  const [clicksSalved, setClicksSalved] = useState<ClickedProps[]>([])

  const handleUndo = () =>{
    const newClikedPoint = [...clicks]
    const undoPoint = newClikedPoint.pop();
    if(!undoPoint) return;
    setClicks(newClikedPoint);
    setClicksSalved([...clicksSalved, undoPoint])
  }

  const handleRedo = () =>{
    const newUndoPoints = [...clicksSalved]
    const redoPont = newUndoPoints.pop();
    if(!redoPont) return;
    setClicksSalved(newUndoPoints);
    setClicks([...clicks, redoPont])
  }

  const handleReset = () =>{
    setClicks([]);
    setClicksSalved([])
  }

  const getCoordinates  = (e: React.MouseEvent<HTMLElement>) =>{
    const {clientX, clientY} = e;
    setClicks([...clicks, {clientX, clientY}])
  }

  return (
    <div className='container' >
      <div className='container-actions flex-center' style={{gap: '20px'}} >
       <div className='flex-center'  style={{gap: '4px'}}>
       <button 
          onClick={handleUndo}
          disabled={clicks.length === 0}
         
        >
          Desfazer
        </button>
        <button 
          onClick={handleRedo} 
          disabled={clicksSalved.length === 0}
        >
          Refazer
        </button>
       </div>
       <div>
       <button 
          onClick={handleReset} 
          
        >
          Reiciniar
        </button>
       </div>
      </div>
      <div className="display-clicks" onClick={getCoordinates} >
      {
        clicks.map( (item, index) =>{
          return(
            <div 
            style={{
              left: `${item.clientX-4}px`,
              top: `${item.clientY-2}px`,
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFF'
            }}
            key={index}></div>
          )
        })
      }
    </div>
    </div>
  )
}

export default App

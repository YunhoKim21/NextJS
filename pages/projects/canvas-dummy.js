import React, { useRef, useState, useEffect } from 'react'

export default function App() {
    const canvasRef = useRef(null)
    const [canvasTag, setCanvasTag] = useState([])

    useEffect(() => {
    

        const canvas = canvasRef.current
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

    
        const width = canvas.offsetWidth
        const height = canvas.offsetHeight
        console.log(canvas.width, canvas.height)
        //canvas.width = width
        //canvas.height = height
    
        const context = canvas.getContext('2d')
    
        context.strokeStyle = 'black'
        context.fillStyle = 'red'
        context.lineWidth = 5

        context.beginPath(); 
        context.moveTo(0, 0); 
        context.lineTo(100, 100); 
        context.stroke();

        context.beginPath(); 
        context.arc(100, 100, 100, 0, 2 * Math.PI, false); 
        context.fill()

        setCanvasTag(canvas)
    }, [])

    return (
        <>
        <div className=" pace-items-center m-5 justify-center rounded-2xl bg-gray-100 p-2 h-screen" >
        <canvas ref={canvasRef} className=""></canvas>
      </div>
        </>
    )
}
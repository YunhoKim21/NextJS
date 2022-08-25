import React, { useRef, useState, useEffect } from 'react'
import { rInt } from 'utils/math'

export default function ConvexHull() {
  const canvasRef = useRef(null)
  const [canvasTag, setCanvasTag] = useState([])
  const [n_points, set_n_points] = useState(50)

  useEffect(() => {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight * 0.8

    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    context.strokeStyle = 'blue'
    context.fillStyle = 'black'
    context.lineWidth = 2.5

    var points = Array(n_points)

    for (let i = 0; i < n_points; i++) {
      points[i] = [rInt(0, width), rInt(0, height)]
    }

    points.forEach((p) => {
      context.beginPath()
      context.arc(p[0], p[1], 3, 0, 2 * Math.PI, false)
      context.fill()
    })

    /*
        context.beginPath(); 
        context.moveTo(0, 0); 
        context.lineTo(100, 100); 
        context.stroke();

        context.beginPath(); 
        context.arc(100, 100, 100, 0, 2 * Math.PI, false); 
        context.fill()*/

    setCanvasTag(canvas)
  }, [])
  console.log('canvasTag : ', canvasTag)

  return (
    <div className="canvas_wrap">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

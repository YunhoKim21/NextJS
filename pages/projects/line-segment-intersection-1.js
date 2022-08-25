import React, { useRef, useState, useEffect } from 'react'
import { rInt, twoLineIntersection, in_range } from 'utils/math'

function find_intersect(to_search, current, lines) {
  var result = []
  to_search.forEach((index) => {
    var [x, y] = twoLineIntersection(...lines[index], ...lines[current])
    if (
      in_range(x, lines[index][0], lines[index][2]) &&
      in_range(x, lines[current][0], lines[current][2])
    ) {
      if (
        in_range(
          y,
          lines[index][1],
          lines[index][3],
          in_range(y, lines[current][1], lines[current][3])
        )
      ) {
        result.push([x, y])
      }
    }
  })
  return result
}

export default function ConvexHull() {
  const canvasRef = useRef(null)
  const [canvasTag, setCanvasTag] = useState([])
  const [n_lines, set_n_lines] = useState(20)
  const [varForTrigger, setVarForTrigger] = useState(0)

  useEffect(() => {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight * 0.8

    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    context.strokeStyle = 'black'
    context.fillStyle = 'red'
    context.lineWidth = 1

    var lines = Array(n_lines)
    for (let i = 0; i < n_lines; i++) {
      lines[i] = [rInt(0, width), rInt(0, height), rInt(0, width), rInt(0, height)]
    }

    lines = lines.map(([x1, y1, x2, y2]) => {
      return x1 < x2 ? [x1, y1, x2, y2] : [x2, y2, x1, y1]
    })

    lines.sort((line1, line2) => {
      return line1[0] - line2[0]
    })

    var x_ends = []

    for (let i = 0; i < n_lines; i++) {
      x_ends.push({ x: lines[i][0], index: i, position: 0 })
      x_ends.push({ x: lines[i][2], index: i, position: 2 })
    }
    x_ends.sort((p1, p2) => {
      return p1.x - p2.x
    })

    var c_lines = []
    var intersects = []

    x_ends.forEach((item, index, array) => {
      if (item.position === 0) {
        var res = find_intersect(c_lines, item.index, lines)
        res.forEach((p) => {
          context.beginPath()
          context.arc(p[0], p[1], 4, 0, Math.PI * 2, false)
          context.fill()

          intersects.push(p)
        })

        c_lines.push(item.index)
      } else {
        c_lines = c_lines.filter((e) => e !== item.index)
      }
    })

    lines.map((points) => {
      context.beginPath()
      context.moveTo(points[0], points[1])
      context.lineTo(points[2], points[3])
      context.stroke()
    })

    /*
        context.beginPath(); 
        context.moveTo(0, 0); 
        context.lineTo(100, 100); 
        context.stroke();

        context.beginPath(); 
        context.arc(100, 100, 100, 0, 2 * Math.PI, false); 
        context.arc()
        context.fill()*/

    setCanvasTag(canvas)
  }, [n_lines, varForTrigger])

  return (
    <>
      <div className="canvas_wrap">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  )
}

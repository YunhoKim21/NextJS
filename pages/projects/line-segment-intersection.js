import { PageSEO } from '@/components/SEO'
import { Flex } from '@chakra-ui/react'
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
    var width = window.innerWidth * 0.75
    var height = window.innerHeight * 0.8

    const canvas = canvasRef.current
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    //canvas.width = width
    //canvas.height = height
    width = canvas.width
    height = canvas.height

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
        some note

        context.beginPath(); 
        context.arc(100, 100, 100, 0, 2 * Math.PI, false); 
        context.fill()*/

    setCanvasTag(canvas)
  }, [n_lines, varForTrigger])

  return (
    <>
      <PageSEO title="Line segment intersection" />
      <p className="text-3xl">Line Segment Intersection </p>
      <p className="m-5 text-lg">
        The following code detects all intersection of randomly generated line segments, in O(nlogn)
        time complexity.
      </p>
      <div className="flex place-items-center justify-center">
        <input
          type="number"
          className="mx-3 border-0"
          defaultValue={20}
          onChange={(e) => {
            if (e.target.value >= 1) {
              set_n_lines(e.target.value)
            }
          }}
        ></input>
        <button
          className="rounded-xl bg-gray-300 p-2"
          onClick={() => {
            setVarForTrigger(varForTrigger + 1)
          }}
        >
          Generate
        </button>
      </div>

      <Flex backgroundColor="gray.100" h="70vh" m="5" rounded="3xl">
        <canvas ref={canvasRef} className=""></canvas>
      </Flex>
    </>
  )
}

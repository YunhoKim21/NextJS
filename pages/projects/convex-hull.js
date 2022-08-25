import Konva from 'konva'
import { useEffect, useState } from 'react'
import { in_range, rInt } from 'utils/math'

import {
  Center,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

export default function App() {
  const [n_points, set_n_points] = useState(20)

  useEffect(() => {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight * 0.8

    var stage = new Konva.Stage({
      container: 'container', // id of container <div>
      width: window.innerWidth,
      height: window.innerHeight,
    })

    var layer = new Konva.Layer()

    var points = Array(n_points)
    for (let i = 0; i < n_points; i++) {
      points[i] = [rInt(0, width), rInt(0, height)]
    }

    points.sort((p1, p2) => {
      return p1[0] - p2[0]
    })

    var l_result = [...points[0]]

    var range_min = points[0][1]
    var range_max = points[0][1]
    var left_end = points[0]
    var right_end = points[0]

    points.forEach((p) => {
      if (!in_range(p[1], range_min, range_max)) {
        if (p[1] > range_max) {
          var line1 = new Konva.Line({
            points: [...right_end, ...p],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
          })
          right_end = p
          range_max = p[1]
          layer.add(line1)
          l_result = [...l_result, ...p]
        } else {
          var line2 = new Konva.Line({
            points: [...left_end, ...p],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
          })
          left_end = p
          range_min = p[1]
          layer.add(line2)
          l_result = [...p, ...l_result]
        }
      }
    })

    points = points.reverse()

    var r_result = points[0]

    range_min = points[0][1]
    range_max = points[0][1]
    left_end = points[0]
    right_end = points[0]

    points.forEach((p) => {
      if (!in_range(p[1], range_min, range_max)) {
        if (p[1] > range_max) {
          var line1 = new Konva.Line({
            points: [...right_end, ...p],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
          })
          right_end = p
          range_max = p[1]
          layer.add(line1)
          r_result = [...p, ...r_result]
        } else {
          var line2 = new Konva.Line({
            points: [...left_end, ...p],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
          })
          left_end = p
          range_min = p[1]
          layer.add(line2)
          r_result = [...r_result, ...p]
        }
      }
    })

    var line = new Konva.Line({
      points: [...l_result, ...r_result],
      fill: '#00D2FF',
      closed: true,
    })
    layer.add(line)

    points.map((p) => {
      var circle = new Konva.Circle({
        x: p[0],
        y: p[1],
        radius: 3,
        fill: 'black',
        draggable: true,
      })
      layer.add(circle)
    })

    stage.add(layer)
    layer.draw()
  }, [n_points])

  return (
    <>
      <Text className="text-3xl">Convex Hall Generation </Text>
      <Text marginY={3}>
        This finds the smallest convex hall. Enter number of random points below.
      </Text>

      <Center>
        <NumberInput
          min={3}
          allowMouseWheel
          defaultValue={20}
          margin="3"
          onChange={(e) => {
            if (e >= 3) {
              set_n_points(parseInt(e))
            }
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Center>
      <div id="container"></div>
    </>
  )
}

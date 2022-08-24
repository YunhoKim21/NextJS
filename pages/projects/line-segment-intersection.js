import Konva from 'konva'
import { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Input,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

function rInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //최댓값은 제외, 최솟값은 포함
}

function in_range(target, from, to) {
  if (from < to) {
    return from < target && target < to
  } else {
    return to < target && target < from
  }
}

function twoLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a = y2 - y1
  var b = x1 - x2
  var c = y1 * (x1 - x2) + x1 * (y2 - y1)
  var d = y4 - y3
  var e = x3 - x4
  var f = y3 * (x3 - x4) + x3 * (y4 - y3)
  var x = (e * c - b * f) / (a * e - b * d)
  var y = (-d * c + a * f) / (a * e - d * b)
  return [x, y]
}

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

function generate(n_lines) {
  const width = window.innerWidth * 0.6
  const height = window.innerHeight * 0.8

  var stage = new Konva.Stage({
    container: 'container', // id of container <div>
    width: width,
    height: height,
  })
  // then create layer
  var layer = new Konva.Layer()

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
        var circle = new Konva.Circle({
          x: p[0],
          y: p[1],
          radius: 5,
          fill: 'red',
        })
        layer.add(circle)
        intersects.push(p)
      })

      c_lines.push(item.index)
    } else {
      c_lines = c_lines.filter((e) => e !== item.index)
    }
  })

  lines.map((points) => {
    var line = new Konva.Line({
      points: points,
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
    })
    layer.add(line)
  })

  // add the layer to the stage
  stage.add(layer)

  // draw the image
  layer.draw()
}

export default function Home() {
  const [n_lines, set_n_lines] = useState(20)

  useEffect(() => {
    generate(n_lines)
  })

  return (
    <>
      <Text className="text-3xl">Line segment intersection </Text>
      <Text>Detects all intersections of randomly generated line segments, in O(nlogn). </Text>
      <Center>
        <NumberInput
          min={1}
          allowMouseWheel
          defaultValue={20}
          onChange={(e) => {
            set_n_lines(parseInt(e))
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          margin={10}
          align="center"
          onClick={() => {
            generate(n_lines)
          }}
        >
          Regenerate
        </Button>
      </Center>

      <Center>
        <div id="container"></div>
      </Center>
      <Text fontSize="3xl" marginTop="10">
        Interesting Quesitons
      </Text>
      <UnorderedList>
        <ListItem>Come up with an algorithm that does this in O(nlogn).</ListItem>
        <ListItem>
          When there are n lines, what would be the average number of intersections?
        </ListItem>
        <ListItem>
          Let p be the probability of two random line intersecting. What is the relationship between
          p and total number of intersections?
        </ListItem>
      </UnorderedList>
    </>
  )
}

import { Flex, Box, Text, Center, Button } from '@chakra-ui/react'
import { useState } from 'react'

const colors = ['white', 'red.400', 'blue.400']

var initialGameState = {
  board: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],

  player: 1,
  gameOver: false,
  message: 'red to go!',
}

function handleClick(props) {
  if (props.gameState.gameOver) {
    return
  }

  var position = -1
  var arr = props.gameState.board[props.index]

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      position = i
    }
  }

  if (position === -1) {
    return
  }

  const dx = [1, -1, 0, 0, 1, -1, 1, -1]
  const dy = [0, 0, 1, -1, 1, 1, -1, -1]

  for (let i = 0; i < 8; i++) {
    var col = props.index
    var row = position
    var flag = true
    for (let j = 1; j < 4; j++) {
      col += dx[i]
      row += dy[i]
      var temp_flag = false
      if (0 <= col && col < 6 && 0 <= row && row <= 6) {
        if (props.gameState.board[col][row] === props.gameState.player) {
          temp_flag = true
        }
      }
      flag = temp_flag && flag
    }
    if (flag) {
      const newState = props.gameState
      newState.board[props.index][position] = props.gameState.player
      newState.message = newState.player === 1 ? 'red wins!' : 'blue wins!'
      newState.gameOver = true
      props.setter(JSON.parse(JSON.stringify(newState)))
      return
    }
  }

  const newState = props.gameState
  newState.board[props.index][position] = props.gameState.player
  newState.player = 3 - newState.player
  newState.message = newState.player === 1 ? 'red to go!' : 'blue to go!'

  props.setter(JSON.parse(JSON.stringify(newState)))
}

function Cell(props) {
  // props.color : 0 white 1 red 2 blue
  return <Flex w="60px" h="60px" bgColor={colors[props.color]} rounded="3xl" margin="3"></Flex>
}

function Column(props) {
  // props : [0, 0, 0, 0, 1, 2]
  return (
    <Flex
      direction="column"
      onClick={(e) => {
        handleClick(props)
      }}
    >
      {props.column.map((color) => {
        return Cell({ color: color })
      })}
    </Flex>
  )
}

function handleReset(setter) {
  initialGameState.board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]
  setter(JSON.parse(JSON.stringify(initialGameState)))
}

export default function Connect4() {
  const [gameState, setGameState] = useState(initialGameState)

  return (
    <>
      <Center h="100vh" flexDir="column">
        <Flex marginBottom="20" align="center">
          <Text fontSize="40" marginX="20">
            Connect 4
          </Text>

          <Button
            onClick={(e) => {
              handleReset(setGameState)
            }}
          >
            Reset
          </Button>
        </Flex>

        <Box bgColor="gray.100" w="fit-content" h="fit-content" p="5" rounded="3xl">
          <Flex>
            {gameState.board.map((column, index) => (
              <Column
                key={index}
                column={column}
                index={index}
                gameState={gameState}
                setter={setGameState}
              />
            ))}
          </Flex>
        </Box>

        <Text margin={3} fontSize="xl">
          {' '}
          {gameState.message}
        </Text>
      </Center>
    </>
  )
}

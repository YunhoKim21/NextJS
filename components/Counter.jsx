import { Button, Center, Container, Space, Text, Tooltip } from '@mantine/core'
import { useReducer } from 'react'
import { useClipboard } from '@mantine/hooks'

export default function Connect4() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'plus':
        return { value: state.value + 1 }
      case 'minus':
        return { value: state.value - 1 }
      case 'reset':
        return { value: 0 }
    }
  }
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  const clipboard = useClipboard()
  return (
    <Container>
      <Center>
        <Tooltip
          label="Value copied!"
          offset={5}
          position="bottom"
          radius="xl"
          transition="slide-down"
          transitionDuration={100}
          opened={clipboard.copied}
        >
          <Text size={80} onClick={() => clipboard.copy(state.value)}>
            {state.value}
          </Text>
        </Tooltip>
      </Center>
      <Space h="md" />
      <Center>
        <Button color={'blue'} variant="light" onClick={() => dispatch({ type: 'plus' })}>
          <Text size={20}>+</Text>
        </Button>
        <Button color={'red'} variant="light" onClick={() => dispatch({ type: 'minus' })}>
          <Text size={20}>-</Text>
        </Button>
        <Button color={'gray'} variant="light" onClick={() => dispatch({ type: 'reset' })}>
          <Text size={20}>Reset</Text>
        </Button>
      </Center>
    </Container>
  )
}

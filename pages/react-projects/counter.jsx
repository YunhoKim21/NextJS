import { Button, Text } from '@chakra-ui/react'
import { useReducer } from 'react'

function stateReducer(state, action) {
  switch (action.type) {
    case 'plus':
      return { value: state.value + 1 }
  }
}
export default function Counter() {
  const [state, stateDispacher] = useReducer(stateReducer, { value: 0 })
  return (
    <div>
      <Text align={'center'} fontSize="3xl">
        Counter
      </Text>
      <Text align={'center'} fontSize="3xl">
        {state.value}
      </Text>
      <Button
        onClick={() => {
          stateDispacher(state, { type: 'plus' })
        }}
      >
        +
      </Button>
    </div>
  )
}

import { Button, Container, Grid, Text } from '@nextui-org/react'
import { useReducer, useState } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'plus':
      return { count: state.count + 1 }
    case 'minus':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <Container fluid alignItems="start">
      <Text align="center">Counter</Text>
      <Text align="center" h1>
        {state.count}
      </Text>

      <Grid.Container gap={2} justify="center">
        <Grid fluid={1}>
          <Button
            onPress={() => {
              dispatch({ type: 'plus' })
            }}
          >
            Plus
          </Button>
        </Grid>
        <Grid fluid={1}>
          <Button
            onPress={() => {
              dispatch({ type: 'minus' })
            }}
          >
            Minus
          </Button>
        </Grid>
        <Grid fluid={1}>
          <Button
            onPress={() => {
              dispatch({ type: 'reset' })
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

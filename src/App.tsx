import React, { useState } from 'react'
import styled from '@emotion/styled'

interface IHistory {
  squares: string[]
  index: number
}

const GamePanel: React.FC = () => {
  return <div>aaa</div>
}

const App: React.FC = () => {
  const squares = useState<string[]>([])
  const history = useState<IHistory[]>([])

  return (
    <React.Fragment>
      <GamePanel />
    </React.Fragment>
  )
}

export default App

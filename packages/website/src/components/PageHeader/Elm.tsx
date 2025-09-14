import Box from '@mui/material/Box'
import * as React from 'react'


export type Props = {
  title: string
  description: string
}

export default function Elm({ title, ..._ }: Props) {
  return (
    <Box>
      <h1 className="text-center text-xl">{title}</h1>
    </Box>
  )
}

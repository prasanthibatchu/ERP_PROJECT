import React from 'react'
import { TextField } from '@mui/material'
export const Reusabletextfield=(props)=> {
  return (
    <div>
         <TextField name={props.name} value={props.val} error={props.error} onChange={props.change} label={props.label} variant={props.variant} type={props.type}/>
    </div>
  )
}

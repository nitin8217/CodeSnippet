"use client"
import React from 'react'
type ErrorPageProps = {
    error: Error
}
const ErrorPAge : React.FC<ErrorPageProps> = ({error}) => {
  return (
    <div>
        {error.message}
    </div>
  )
}

export default ErrorPAge

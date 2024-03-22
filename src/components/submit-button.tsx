// Imported in a client component
// So, no need to explicitly mark this as client component
import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

/**
 * @brief To use useFormStatus the form needs to be an ancestor
 * 
 */
const SubmitButton = () => {
  const { pending } = useFormStatus()

  return <Button disabled={pending} type="submit">
    Add Todo
  </Button>
}

export default SubmitButton
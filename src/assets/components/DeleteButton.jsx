import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'flowbite-react'

function DeleteButton ({ onClick }) {
  return (
    <Tooltip content='Eliminar'>
      <Button color='failure' onClick={onClick} className='w-8 h-8 flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-x'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </Button>
    </Tooltip>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteButton

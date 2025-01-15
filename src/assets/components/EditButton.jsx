import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'flowbite-react'

function EditButton ({ onClick }) {
  return (
    <Tooltip content='Editar'>
      <Button color='success' onClick={onClick} className='w-8 h-8 flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-edit'
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
          <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
          <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
          <path d='M16 5l3 3' />
        </svg>
      </Button>
    </Tooltip>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default EditButton

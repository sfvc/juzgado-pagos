import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'flowbite-react'

function DownloadButton ({ onClick }) {
  return (
    <Tooltip content='Descargar Botones'>
      <Button color='warning' onClick={onClick} className='w-8 h-8 flex items-center justify-center'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-download'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
          <path d='M7 11l5 5l5 -5' /><path d='M12 4l0 12' />
        </svg>
      </Button>
    </Tooltip>
  )
}

DownloadButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DownloadButton

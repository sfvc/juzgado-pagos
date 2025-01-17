import { useEffect, useState } from 'react'
import { TextInput } from 'flowbite-react'
import juzgadoApi from '@/api/juzgadoApi'
import { deleteDuplicateName } from '../util/deleteDuplicateName'
import { useQuery } from '@tanstack/react-query'

function SearchInfractor ({ resetFiltro, onSelectPersona }) {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true)

  const { data: personas = [], isFetching, refetch } = useQuery({
    queryKey: ['buscarPersonas', search],
    queryFn: async () => {
      if (search.length <= 3) return []
      const response = await juzgadoApi.get(`/personas/buscar/${search}`)
      return response.data.data
    },
    enabled: false
  })

  useEffect(() => {
    if (search.length > 3) {
      const timeoutId = setTimeout(() => refetch(), 1000)
      return () => clearTimeout(timeoutId)
    } else {
      setShow(true)
    }
  }, [search, refetch])

  useEffect(() => {
    if (!resetFiltro) setSearch('')
  }, [resetFiltro])

  function selectPersona (per) {
    const identificacion = per.numero_documento ? per.numero_documento : per.cuit
    const nombre = deleteDuplicateName(per.apellido, per.nombre)
    setSearch(`${identificacion} - ${nombre}`)
    setShow(false)

    if (onSelectPersona) {
      onSelectPersona({ persona_id: per.id })
    }
  }

  return (
    <>
      <div className='mb-4 relative'>
        <TextInput
          name='search'
          type='text'
          placeholder='Ingrese el apellido y nombre o DNI'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div type='button' className='absolute top-3 right-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-search dark:stroke-white'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#000000'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
            <path d='M21 21l-6 -6' />
          </svg>
        </div>

        {search.length >= 3 && show && (
          <ul className='w-full overflow-y-auto h-max-32 absolute z-10 bg-white'>
            {isFetching
              ? (
                <li className='hover:bg-slate-300 border-b-2 border-x px-2 py-2'>
                  Buscando personas...
                </li>
                )
              : personas.length > 0
                ? (
                    personas.map((per) => (
                      <li
                        key={per.id}
                        className='hover:bg-slate-300 border-b-2 border-x px-2'
                      >
                        <button
                          type='button'
                          className='mb-1 w-full text-start py-2'
                          onClick={() => selectPersona(per)}
                        >
                          <strong>{per.numero_documento || per.cuit}</strong> -{' '}
                          {deleteDuplicateName(per.apellido, per.nombre)}
                        </button>
                      </li>
                    ))
                  )
                : (
                  <li className='hover:bg-slate-300 border-b-2 border-x px-2 py-2'>
                    No se encontró a la persona.
                  </li>
                  )}
          </ul>
        )}
      </div>
    </>
  )
}

export default SearchInfractor

import React, { useState } from 'react'
import { Button, TextInput } from 'flowbite-react'
import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getActaById } from '@/services/multasService'
import logo from '@/images/logo-capital-dark.webp'
import DefaultFooter from '@/assets/layout/DefaultFooter'

export default function HomePage () {
  const [enabled, setEnabled] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({
    id: '',
    dni: '',
    numeroActa: '',
    patente: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['actas', filters],
    queryFn: () => getActaById(filters),
    enabled
  })

  const handleSubmit = () => {
    setEnabled(true)
    setHasSearched(true)
  }

  const handleConsultAgain = () => {
    setFilters({
      id: '',
      dni: '',
      numeroActa: '',
      patente: ''
    })
    setEnabled(false)
    setHasSearched(false)
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 dark:bg-slate-900'>
      <header className='navbar__muni text-white py-2'>
        <div className='container mx-auto flex justify-between items-center'>
          <img src={logo} alt='Logo Catamarca' className='max-w-full h-12 w-auto m-2' />
        </div>
      </header>

      <main className='flex flex-1 justify-center items-center px-4 py-12'>
        <div className='bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 w-full max-w-xl text-center space-y-8'>
          <p className='text-gray-700 dark:text-slate-400 mb-6 font-semibold text-lg'>
            Consulta y pagá tus multas de manera rápida y sencilla.
          </p>

          {!hasSearched
            ? (
              <div>
                <div className='space-y-8'>

                  <TextInput
                    name='id'
                    value={filters.id}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type='text'
                    placeholder='ID'
                    className='w-full rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-700 transition duration-300 ease-in-out'
                  />

                  <TextInput
                    name='dni'
                    value={filters.dni}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type='text'
                    placeholder='DNI'
                    className='w-full rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-700 transition duration-300 ease-in-out'
                  />

                  <TextInput
                    name='numeroActa'
                    value={filters.numeroActa}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type='text'
                    placeholder='Número de Acta'
                    className='w-full rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-700 transition duration-300 ease-in-out'
                  />

                  <TextInput
                    name='patente'
                    value={filters.patente}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type='text'
                    placeholder='Patente'
                    className='w-full rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-700 transition duration-300 ease-in-out'
                  />

                  <Button
                    onClick={handleSubmit}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-xl transition-all ease-in-out duration-300'
                  >
                    Consultar
                  </Button>
                </div>

                {isLoading && <p className='text-blue-600 mt-4'>Cargando...</p>}
                {error && <p className='text-red-600 mt-4'>Error: No se encontró ninguna multa.</p>}
              </div>
              )
            : (
              <div className='bg-gray-50 dark:bg-slate-700 p-8 rounded-lg shadow-xl'>
                <h2 className='font-semibold text-2xl text-blue-600 mb-6'>Multa Encontrada</h2>
                <div className='space-y-6'>
                  {[
                    ['Apellido y Nombre', data?.infractores?.[0]?.nombre || 'No disponible'],
                    ['Numero de Acta', data?.numero_acta || 'No disponible'],
                    ['Tipo de Acta', data?.tipo_acta || 'No disponible'],
                    ['Fecha', data?.fecha || 'No disponible'],
                    ['Estado', data?.estados?.[0]?.nombre || 'Sin estado'],
                    // ['Infracción', data?.infracciones_cometidas?.[0]?.detalle || 'No hay infracción'],
                    ['Vehículo', data?.vehiculo?.dominio || 'No disponible'],
                    ['Observaciones', data?.observaciones || 'No hay observaciones'],
                    ['Calle', data?.calle || 'No disponible']
                  ].map(([label, value]) => (
                    <div key={label} className='flex justify-between'>
                      <span className='font-medium'>{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                <div className='mt-8'>
                  <Button
                    onClick={handleConsultAgain}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-xl transition-all ease-in-out duration-300'
                  >
                    Consultar nuevamente
                  </Button>
                </div>
              </div>
              )}

          <div className='mt-8 flex justify-center items-center gap-2 text-sm'>
            <HelpCircle className='w-4 h-4 text-blue-600' />
            <span className='text-gray-600 dark:text-slate-400'>
              ¿Tenés dudas?
            </span>
            <Link to='#' className='text-blue-600 hover:underline'>
              Consultá cómo pagar
            </Link>
          </div>
        </div>
      </main>

      <DefaultFooter />
    </div>
  )
}

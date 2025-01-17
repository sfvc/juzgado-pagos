/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Button, TextInput } from 'flowbite-react'
import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getActasFilter } from '@/services/multasService'
import logo from '@/images/logo-capital-dark.webp'
import DefaultFooter from '@/assets/layout/DefaultFooter'
import SearchInfractor from '@/assets/components/SearchInfractor'
import SearchVehiculo from '@/assets/components/SearchVehiculo'
import Loading from '@/Loading'

export default function HomePage () {
  const [enabled, setEnabled] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({
    persona_id: '',
    numero_acta: '',
    vehiculo_id: ''
  })
  const isButtonDisabled = !Object.values(filters).some((filter) => filter !== '')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const { data, isLoading } = useQuery({
    queryKey: ['actas', filters],
    queryFn: () => getActasFilter(filters),
    enabled
  })

  const handleSubmit = () => {
    setEnabled(false)
    setTimeout(() => {
      setEnabled(true)
      setHasSearched(true)
    }, 0)
  }

  const handleConsultAgain = () => {
    setFilters({
      persona_id: '',
      numero_acta: '',
      vehiculo_id: ''
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
        <div className='bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-3xl text-center space-y-8'>
          <p className='text-gray-700 dark:text-slate-400 mb-6 font-semibold text-lg'>
            Consulta y pagá tus multas de manera rápida y sencilla.
          </p>

          {!hasSearched
            ? (
              <div>
                <div className='space-y-4 sm:space-y-4'>
                  <SearchInfractor
                    resetFiltro={!enabled}
                    onSelectPersona={({ persona_id }) =>
                      setFilters((prev) => ({ ...prev, persona_id }))}
                  />

                  <div className='my-1 flex justify-center items-center pointer-events-none'>
                    <span className='text-gray-600 dark:text-slate-400 pointer-events-none hidden md:flex'>
                      ───────────────────── o ─────────────────────
                    </span>
                    <span className='text-gray-600 dark:text-slate-400 pointer-events-none md:hidden'>
                      ─────── o ───────
                    </span>
                  </div>

                  <SearchVehiculo
                    resetFiltro={!enabled}
                    onSelectVehiculo={({ vehiculo_id }) =>
                      setFilters((prev) => ({ ...prev, vehiculo_id }))}
                  />

                  <div className='my-4 flex justify-center items-center pointer-events-none'>
                    <span className='text-gray-600 dark:text-slate-400 pointer-events-none hidden md:flex'>
                      ───────────────────── o ─────────────────────
                    </span>
                    <span className='text-gray-600 dark:text-slate-400 pointer-events-none md:hidden'>
                      ─────── o ───────
                    </span>
                  </div>

                  <TextInput
                    name='numero_acta'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Número de Acta'
                    className='w-full rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-700 transition duration-300 ease-in-out'
                  />

                  <Button
                    onClick={handleSubmit}
                    className={`w-full py-3 rounded-lg shadow-xl transition-all ease-in-out duration-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    disabled={isButtonDisabled}
                  >
                    Consultar
                  </Button>
                </div>

                {isLoading && <Loading />}
              </div>
              )
            : (
              <div>
                <div className='bg-gray-50 dark:bg-slate-700 p-8 rounded-lg shadow-xl'>
                  {isLoading && <Loading />}

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                    {Array.isArray(data?.data) && data?.data.length > 0
                      ? (
                          data?.data.map((multa, index) => {
                            const estado = multa?.estados?.[0]?.nombre?.toLowerCase()
                            const showPaymentButton = !(estado === 'pagada' || estado === 'terminada' || estado === 'con notificación de resolución')

                            return (
                              <div
                                key={index}
                                className='bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-3xl'
                              >
                                <div className='text-sm font-semibold text-gray-700 dark:text-slate-200'>
                                  <span className='block text-lg'>Apellido y Nombre:</span>
                                  {multa?.infractores?.[0]?.nombre || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Número de Acta:</span> {multa?.numero_acta || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Tipo de Acta:</span> {multa?.tipo_acta || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Fecha:</span> {multa?.fecha || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Vehículo:</span> {multa?.vehiculo?.dominio || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Observaciones:</span> {multa?.observaciones || 'No hay observaciones'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Calle:</span> {multa?.calle || 'No disponible'}
                                </div>
                                <div className='text-sm text-gray-600 dark:text-slate-400'>
                                  <span className='block text-lg'>Estado:</span> {multa?.estados?.[0]?.nombre || 'No disponible'}
                                </div>

                                {showPaymentButton && (
                                  <Button
                                    className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4 transition-all ease-in-out duration-300'
                                  >
                                    Proceder al pago
                                  </Button>
                                )}
                              </div>
                            )
                          })
                        )
                      : !isLoading && (
                        <div className='col-span-3 text-center text-gray-600 dark:text-slate-400'>
                          No se encontraron resultados.
                        </div>
                        )}
                  </div>
                </div>

                <div className='mt-8'>
                  <Button
                    onClick={handleConsultAgain}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-xl mt-4 transition-all ease-in-out duration-300'
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

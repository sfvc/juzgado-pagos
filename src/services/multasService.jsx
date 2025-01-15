import juzgadoApi from '../api/juzgadoApi'
export const setUrlParams = (filters) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) { // Solo agrega parámetros con valores definidos
      params.append(key, value)
    }
  })

  return params
}

export const getDataFilter = async () => {
  const response = await juzgadoApi.get('actas-data')
  return response.data
}

export const getActasFilter = async (filters) => {
  const params = setUrlParams(filters)

  const response = await juzgadoApi.get('/actas/filtrar', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getActaById = async (filters) => {
  const response = await juzgadoApi.get(`/actas/${filters.id}`)
  const { data } = response.data
  return data
}

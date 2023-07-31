import { API_ROOT } from '../constants'

export const handleFetch = (URL, callback) => {
  fetch(`${API_ROOT}/${URL}`)
    .then(res => res.json())
    .then(data => callback(data))
}

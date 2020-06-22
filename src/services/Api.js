import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://dragonsofmugloar.com/api/v2/',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

import axios from 'axios'

const second = 1000

axios.defaults.timeout = second * 60

axios.interceptors.request.use(
  config => {

    config.withCredentials = true
    
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
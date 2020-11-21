import http from './request'
import axios from './axios'
// import { getUrl } from './utils'
const url = ''


export const yhuoDxHttp = {
  companyNumber: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/company-number`, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
}
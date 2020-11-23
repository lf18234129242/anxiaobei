import http from './request'
import axios from '@/utils/axios'
// import { getUrl } from './utils'
const url = 'https://dev.yfdxb.cn'


export const yhuoDxHttp = {
  companyNumber: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/company-number`, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
  deviceCheckList: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/device-check-list`, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
  classSumData: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/class-sum-data`, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
  companyTotal: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/company-total
    `, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
  weather: async (params) => {
    const res = await http(axios.post(`${url}/api/company/auth/weather
    `, params))
    if(res) {
      return Promise.resolve(res)
    }
    return Promise.reject(false)
  },
}
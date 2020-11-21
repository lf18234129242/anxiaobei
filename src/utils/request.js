
import bus from '@/utils/bus'

const SUCCESS_STATUS = 0
const NEED_AUTH = 401

window.isLogin = true

const handleRequest = request => {
  return new Promise((resolve, reject) => {

    request
      .then(res => {
        const data = res.data

        if (data.code === SUCCESS_STATUS) {
          // 如果请求成功
          return resolve(data)
        } else {
          return resolve(data)
        }
      })
      .catch(err => {
        const { response } = err

        if (response) {
          const { status } = response
          if (status === NEED_AUTH) {
            // 如果请求需要登录
            if(window.isLogin) {
              // toast.showMsg('请先登录', 'w')
              window.isLogin = false
              setTimeout(() => {
                window.isLogin = true
              }, 500)
              bus.$emit('auth')
            }
          }
        }

        return reject(err)
      })
  })
}

export default handleRequest

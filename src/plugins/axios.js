import axios from 'axios'

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})

export function axiosReq(option) {
  return new Promise((resolve, reject) => {
    _axios({
      ...option
    }).then((res) => {
      if (res.data.success && res.data.data) {
        resolve(res.data)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export default _axios

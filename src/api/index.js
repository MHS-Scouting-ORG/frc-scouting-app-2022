import { API } from 'aws-amplify'

let api = API
if(process.env.NODE_ENV !== 'production')
  api = {
    get() {
      return Promise.resolve([])
    },

    put() {
      return Promise.resolve({})
    }
  }

export default api

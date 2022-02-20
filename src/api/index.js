import { API } from 'aws-amplify'

let api = API
if(process.env.REACT_APP_ENABLE_AUTH !== '1')
  api = {
    get() {
      return Promise.resolve([])
    },

    put() {
      return Promise.resolve({})
    }
  }

export default api

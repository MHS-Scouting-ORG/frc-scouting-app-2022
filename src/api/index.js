import { API, Auth } from 'aws-amplify'

const use_remote = process.env.REACT_APP_ENABLE_AUTH === '1'
const api_name = 'apid003caa1'
const endpoint = '/items'
const api = {}
api.get = use_remote ? API.get.bind(API, api_name, endpoint) : async function() {
  return Promise.resolve({})
}

api.put = use_remote ? API.put.bind(API, api_name, endpoint) : async function() {
  return Promise.resolve({})
}



export default api
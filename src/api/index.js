import { API, Auth } from 'aws-amplify'

const use_remote = process.env.REACT_APP_ENABLE_AUTH === '1'
const api_name = 'apid003caa1'
const endpoint = '/items'
const api = {}
api.get = use_remote ? API.get.bind(API, api_name, endpoint) : async function() {
  return Promise.resolve({})
}

api.put = use_remote ? async function(obj) {
  const fn = API.put.bind(API, api_name, endpoint)
  try {
    const user = await Auth.currentAuthenticatedUser()
    //console.log(user)
    if(user) {
      const email = user.attributes.email
      obj.body.email = email
    }
    console.log(obj)
  }
  catch(e) {
    console.log(e)
  }
  console.log(obj)
  return fn(obj)
} : async function() {
  return Promise.resolve({})
}



export default api
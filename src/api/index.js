import { API, Auth } from 'aws-amplify'

import { SSM, STS } from 'aws-sdk'

const use_remote = process.env.REACT_APP_ENABLE_AUTH === '1'
const api_name = 'apid003caa1'
const endpoint = '/items'
const api = {}
const region = 'us-west-2'
api.get = use_remote ? API.get.bind(API, api_name, endpoint) : async function() {
  return Promise.resolve({})
}

const verify_sec = async user => {
  const sts = new STS({credentials: Auth.essentialCredentials(user), region })
  const id = await new Promise((resolve, reject) => {
    sts.getCallerIdentity((err, data) => {
      if(err)
        reject(err)
      else
        resolve(data)
    })
  })
  console.log(id)
}

api.getYear = use_remote ? async function() {
  const user = await Auth.currentCredentials()
  const ssm = new SSM({credentials: Auth.essentialCredentials(user), region})
  return new Promise((resolve, reject) => {
    ssm.getParameter({
      Name:"scouting_app_year"
    }, (err, data) => {
      if(err)
        reject(err)
      else
        resolve(data.Parameter.Value)
    })
  })
  
} : async function() {
  return Promise.resolve(2020)
}

api.getBlueAllianceAuthKey = use_remote ? async function() {
  const user = await Auth.currentCredentials()
  const ssm = new SSM({credentials: Auth.essentialCredentials(user), region})
  return new Promise((resolve, reject) => {
    ssm.getParameter({
      Name:"bluealliance_api_key"
    }, (err, data) => {
      if(err)
        reject(err)
      else
        resolve(data.Parameter.Value)
    })
  })
} : async function() {
  return Promise.resolve("foo")
}

api.put = use_remote ? async function(obj) {
  const fn = API.put.bind(API, api_name, endpoint)
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
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
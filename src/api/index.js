import { API, Auth } from 'aws-amplify'

import { SSM, STS } from 'aws-sdk'
import config from '../config.json'
import data from './data.json'
const use_remote = process.env.REACT_APP_ENABLE_AUTH === '1'
const {
  api_name,
  api_endpoint: endpoint,
  aws_region: region,
  bluealliance_api_endpoint
} = config


const api = {}

api.get = use_remote ? API.get.bind(API, api_name, endpoint) : async function() {
  return Promise.resolve(data)
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

api.getRegional = use_remote ? async function() {
  const user = await Auth.currentCredentials()
  const ssm = new SSM({credentials: Auth.essentialCredentials(user), region})
  return new Promise((resolve, reject) => {
    ssm.getParameter({
      Name:"regional"
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

api.getTeamInfo = async function(api_key) {
  return fetch(`${bluealliance_api_endpoint}/team/frc2443`, { headers : { 'x-tba-auth-key' : api_key }, mode: "cors"})
    .then(res => res.json())
}

api.getBlueAllianceAuthKey = use_remote ? async function() {
  const user = await Auth.currentCredentials()
  const ssm = new SSM({credentials: Auth.essentialCredentials(user), region})
  return new Promise((resolve, reject) => {
    ssm.getParameter({
      Name:"bluealliance_api_key",
      WithDecryption: true
    }, (err, data) => {
      if(err)
        reject(err)
      else
        resolve(data.Parameter.Value)
    })
  })
} : async function() {
  return Promise.resolve('47dyFWjomANFVkIVhafvIf2tFVzuvNsJ9iBOznH89PDotuFbEaSiSB6HpzBxlPZy')
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
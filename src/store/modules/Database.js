import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  databases_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const include = data.include || ''

    let url = apiRoot + config.apiDatabases

    if (include.length > 0) {
      url = url + 'include=' + include
    }

    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  database_create (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const db = data.dbName || ''
    const include = data.include || ''

    let url = apiRoot + config.apiDatabases

    if (include.length > 0) {
      url = url + 'include=' + include
    }

    const params = {
      'name': db
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  database_drop (context, data ={}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const db = data.db
    let url = apiRoot+config.apiDatabases+'/'+db+'/drop'

    return new Promise((resolve, reject) => {
      api.
        destroy(url)
        .then(response => {
          const data = response.data
          resolve data
        })
          .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

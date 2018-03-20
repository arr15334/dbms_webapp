import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  tables_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const db = data.db || ''
    const include = data.include || ''

    let url = apiRoot + config.apiTables
    url = url.replace('{db}', db)

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
  table_create (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const db = data.db || ''
    const tableName = data.tableName || ''
    const columns = data.columns || []
    const include = data.include || ''

    let url = apiRoot + config.apiTables
    url = url.replace('{db}', db)

    if (include.length > 0) {
      url = url + 'include=' + include
    }

    const params = {
      'table_name': tableName,
      'columns': columns
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          const data = response.data
          resolve(data)
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
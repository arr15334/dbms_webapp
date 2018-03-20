import axios from 'axios'
import loadash from 'lodash'

export default {
  get (url, options = {}) {
    let config = {
      'headers': {
        'Lang': 'es'
      }
    }
    config = loadash.merge(config, options)

    return axios
      .get(url, config)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },

  post (url, data, options = {}) {
    let config = {
      'headers': {
        'Lang': 'es',
        'Content-Type': 'application/json'
      }
    }
    config = loadash.merge(config, options)

    return axios
      .post(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  put (url, data, options = {}) {
    let config = {
      'headers': {
        'Lang': 'es',
        'Content-Type': 'application/json'
      }
    }
    config = loadash.merge(config, options)

    return axios
      .put(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  patch (url, data, options = {}) {
    let config = {
      'headers': {
        'Lang': 'es',
        'Content-Type': 'application/json'
      }
    }
    config = loadash.merge(config, options)

    return axios
      .patch(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (url, options = {}) {
    let config = {
      'headers': {
        'Lang': 'es'
      }
    }
    config = loadash.merge(config, options)

    return axios
      .delete(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

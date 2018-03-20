const state = {
  feedbackTitle: '',
  feedbackMessage: '',
  feedbackAction: '',
  feedbackWithExpire: false,
  feedbackIsActive: false
}

const getters = {
  FEEDBACK_TITLE: function (state) {
    return state.feedbackTitle
  },

  FEEDBACK_MESSAGE: function (state) {
    return state.feedbackMessage
  },

  FEEDBACK_ACTION: function (state) {
    return state.feedbackAction
  },

  FEEDBACK_EXPIRE: function (state) {
    return state.feedbackWithExpire
  },

  FEEDBACK_IS_ACTIVE: function (state) {
    return state.feedbackIsActive
  }
}

const mutations = {
  FEEDBACK_OPEN (state, playLoad = {}) {
    state.feedbackTitle = playLoad.title || 'Aviso'
    state.feedbackMessage = playLoad.message || ''
    state.feedbackAction = playLoad.action || 'Enterado'

    state.feedbackWithExpire = (playLoad.hasOwnProperty('expire')) ? playLoad.expire : false
    if (state.feedbackWithExpire && state.feedbackMessage.length <= 0) {
      state.feedbackMessage = 'La sesión ha expirado'
    }

    state.feedbackIsActive = true
  },

  FEEDBACK_CLOSE (state) {
    state.feedbackIsActive = false
    state.feedbackWithExpire = false
  }
}

// async operations
const actions = {
  feedback_process_err (context, data = {}) {
    const err = data.err || {}
    const expire = (data.hasOwnProperty('expire')) ? data.expire : true

    // credentials or session expired
    if (err.response && err.response.status === 401) {
      if (expire) {
        context.commit('FEEDBACK_OPEN', {expire: true})
        return
      }

      context.commit('FEEDBACK_OPEN', {message: 'Credenciales invalidas. Intente otra vez.'})
      return
    }

    // typical error
    if (err.response) {
      const data = err.response.data || {}
      const errors = data.errors || []
      const detail = (errors.length > 0 && errors[0].detail) ? errors[0].detail : 'Error no definido'
      context.commit('FEEDBACK_OPEN', {message: detail})
      return
    }

    // unable to contact to server
    if (err.request) {
      context.commit('FEEDBACK_OPEN', {message: 'No se pudo contactar al servidor. Intente más tarde.'})
      return
    }

    // catch all
    const message = err.message || 'Error no definido'
    context.commit('FEEDBACK_OPEN', {message: message})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

<template>
  <div class="modal" :class="{'is-active': showConfirm}">
    <div class="modal-background" @click="cancel"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmar</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>

      <section class="modal-card-body">
        <p class="has-text-centered">{{ confirmMsg }}</p>
      </section>

      <footer class="modal-card-foot" style="justify-content: flex-end">
        <button class="button" @click="cancel">Cancelar</button>
        <button class="button is-success" @click="accept">Aceptar</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'confirm-modal',

    props: {
      'showConfirm': {
        type: Boolean,
        default: false
      },

      'confirmMsg': {
        type: String,
        default: ''
      }
    },

    methods: {
      accept: function () {
        this.$emit('accept')
      },

      cancel: function () {
        this.$emit('cancel')
      },

      escapeKey: function (e) {
        if (e.keyCode === 27) { // NOTE: 27=ESC Key
          if (this.showConfirm) {
            this.$emit('cancel')
          }
        }
      }
    },

    created: function () {
      window.addEventListener('keyup', this.escapeKey)
    }
  }
</script>

<style lang="scss" scoped></style>

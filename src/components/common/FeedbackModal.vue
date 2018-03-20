<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background" @click="close"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>

      <section class="modal-card-body">
        <p class="has-text-centered">{{ message }}</p>
      </section>

      <footer class="modal-card-foot" style="justify-content: flex-end">
        <button class="button is-success" @click="close">{{ action }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'feedback-modal',

    computed: {
      title: function () {
        return this.$store.getters.FEEDBACK_TITLE
      },

      message: function () {
        return this.$store.getters.FEEDBACK_MESSAGE
      },

      action: function () {
        return this.$store.getters.FEEDBACK_ACTION
      },

      isActive: function () {
        return this.$store.getters.FEEDBACK_IS_ACTIVE
      }
    },

    methods: {
      close: function () {
        const expire = this.$store.getters.FEEDBACK_EXPIRE

        this.$store.commit('FEEDBACK_CLOSE')

        this.$emit('close', expire)
      },

      escapeKey: function (e) {
        if (e.keyCode === 27) { // NOTE: 27=ESC Key
          if (this.isActive) {
            this.close()
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

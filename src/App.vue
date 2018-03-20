<template>
  <div id="app">
    <transition
      enter-active-class="animated fadeIn">
      <router-view/>
    </transition>

    <feedback-modal
      @close="feedBackModalAtClose"/>
  </div>
</template>

<script>
  import FeedbackModal from '@/components/common/FeedbackModal'

  export default {
    name: 'app',

    components: {
      FeedbackModal
    },

    methods: {
      feedBackModalAtClose: function (expire) {
        if (expire) {
          return this.$router.push({name: 'Logout'})
        }
      }
    }
  }
</script>

<style lang="scss"></style>

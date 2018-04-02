<template>
  <div id="app">
    <transition
      enter-active-class="animated fadeIn">
      <router-view/>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'app',

    components: {
    },

    methods: {
    }
  }
</script>

<style lang="scss"></style>

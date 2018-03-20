<template>
  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">
        {{ label }}&nbsp;<sup v-if="isRequired"><a title="Campo requerido">*</a></sup>
      </label>
    </div>

    <div class="field-body">
      <div class="field">
        <div class="control is-expanded"
             :class="{ 'has-icons-left': hasIcon, 'has-icons-right': hasRightIcon }">
          <input type="checkbox"
                 :checked="!!value"
                 :required="isRequired"
                 :disabled="isDisabled"
                 class="checkbox"
                 :class="{ 'is-success': isSuccess, 'is-danger': isDanger }"
                 @change="updateValue($event.target.checked)">

          <span class="icon is-left" v-if="hasIcon"><i class="fa" :class="iconClass"></i></span>

          <span class="icon is-right has-text-success" v-if="isSuccess"><i class="fa fa-check"></i></span>

          <span class="icon is-right has-text-danger" v-if="isDanger"><i class="fa fa-warning"></i></span>
        </div>

        <p class="help is-danger" v-if="isDanger">{{ errorMsg }}</p>

        <p class="help" v-if="showHelpMsg">{{ helpMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'form-checkbox',

    props: {
      'label': {
        type: String,
        default: ''
      },
      'value': {
        type: Boolean,
        default: false
      },
      'isRequired': {
        type: Boolean,
        default: false
      },
      'isDisabled': {
        type: Boolean,
        default: false
      },
      'icon': {
        type: String,
        default: ''
      },
      'isSuccess': {
        type: Boolean,
        default: false
      },
      'isDanger': {
        type: Boolean,
        default: false
      },
      'errorMsg': {
        type: String,
        default: ''
      },
      'helpMsg': {
        type: String,
        default: ''
      }
    },

    computed: {
      hasIcon: function () {
        return (this.icon.length > 0)
      },

      iconClass: function () {
        return this.hasIcon ? 'fa-' + this.icon : ''
      },

      hasRightIcon: function () {
        return this.isSuccess || this.isDanger
      },

      showHelpMsg: function () {
        return (this.helpMsg.length > 0 && !this.isDanger)
      }
    },

    methods: {
      updateValue: function (checked) {
        this.$emit('input', checked)
      }
    }
  }
</script>

<style lang="scss" scoped></style>

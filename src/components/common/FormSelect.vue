<template>
  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">
        {{ label }}&nbsp;<sup v-if="isRequired"><a title="Campo requerido">*</a></sup>
      </label>
    </div>

    <div class="field-body">
      <div class="field">
        <div class="control"
             :class="{'has-icons-left': hasIcon, 'is-loading': isLoading}">
          <div class="select is-fullwidth"
               :class="{ 'is-success': isSuccess, 'is-danger': isDanger }">
            <select :value="value"
                    :disabled="isDisabled"
                    @input="updateValue($event.target.value)">

              <option value="" v-if="hasPlaceHolder">{{ placeHolder }}</option>

              <option v-for="item in list"
                      :value="item.value"
                      :selected="item.value === value">
                {{ item.text }}
              </option>
            </select>
          </div>

          <div class="icon is-left" v-if="hasIcon"><i class="fa" :class="iconClass"></i></div>
        </div>

        <p class="help is-danger" v-if="isDanger">{{ errorMsg }}</p>

        <p class="help" v-if="showHelpMsg">{{ helpMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'form-select',

    props: {
      'label': {
        type: String,
        default: ''
      },
      'placeHolder': {
        type: String,
        default: ''
      },
      'value': {
        type: String
      },
      'list': {
        type: Array
      },
      'isLoading': {
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

      hasPlaceHolder: function () {
        return (this.placeHolder.length > 0)
      },

      showHelpMsg: function () {
        return (!this.isDanger && this.helpMsg.length > 0)
      }
    },

    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped></style>

<template>
  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">
        {{ label }}&nbsp;<sup v-if="isRequired"><a title="Campo requerido">*</a></sup>
      </label>
    </div>

    <div class="field-body">
      <div class="field">
        <div class="control is-expanded">
          <v-select multiple :placeholder="placeHolder"
                    :value.sync="value"
                    :options="list"
                    :on-change="updateValue"
                    :class="{'loading': isLoading}">
            <li slot="no-options">{{ noOptions }}</li>
          </v-select>
        </div>

        <p class="help is-danger" v-if="isDanger">{{ errorMsg }}</p>

        <p class="help" v-if="showHelpMsg">{{ helpMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import vSelect from 'vue-select'

  export default {
    name: 'form-select-multiple-with-search',

    components: {
      vSelect
    },

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
        type: Array,
        default: null
      },
      'list': {
        type: Array,
        default: []
      },
      'noOptions': {
        type: String,
        default: 'Lo sentimos, no se encontró coincidencia.'
      },
      'isRequired': {
        type: Boolean,
        default: false
      },
      'isLoading': {
        type: Boolean,
        default: false
      },
      'isDisabled': {
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

<style lang="scss" scoped>
  .dropdown {
    display: block;
  }
</style>

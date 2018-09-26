<template>
    <el-switch
        v-model="model_"
        :active-color="onOff.activeColor || activeColor"
        :inactive-color="onOff.inactiveColor || inactiveColor"
        :active-text="onOff.activeText || activeText"
        :inactive-text="onOff.inactiveText || inactiveText"
        :active-value="onOff.activeValue || activeValue"
        :inactive-value="onOff.inactiveValue || inactiveValue"
        :disabled='onOff.disabled || disabled'
        :width='onOff.width || width'
        :active-icon-class='onOff.activeIconClass || activeIconClass'
        :inactive-icon-class='onOff.inactiveIconClass || inactiveIconClass'
        :name='onOff.name || name'
    >
    </el-switch>
</template>

<script>
    export default {
      name: 'GlSwitch',
      props: {
        value: {
          type: null
        },
        switch: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        disabled: {
          type: Boolean,
          default: false
        },
        width: {
          type: Number,
          default: 40
        },
        activeIconClass: {
          type: String
        },
        inactiveIconClass: {
          type: String
        },
        activeText: {
          type: String
        },
        inactiveText: {
          type: String
        },
        activeValue: {
          type: [Boolean, String, Number],
          default: true
        },
        inactiveValue: {
          type: [Boolean, String, Number],
          default: false
        },
        activeColor: {
          type: String
        },
        inactiveColor: {
          type: String
        },
        name: {
          type: String
        },
        model: {
          type: [Boolean, String, Number]
        },
        change: {
          type: Function
        }
      },
      data() {
        return {
          model_: this.value,
          onOff: this.switch === undefined ? _ => { return {} } : this.switch,
          change_: this.switch.change === undefined ? this.change === undefined ? _ => null : this.change : this.switch.change
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
          this.$emit('blur', val)
          this.$emit('focus', val)
        },
        value(val) {
          this.model_ = val
        }
      }
    }
</script>

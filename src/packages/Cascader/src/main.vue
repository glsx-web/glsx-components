<template>
    <el-cascader
        :options="cascader.options || options"
        :value='cascader.value || value'
        v-model="model_"
        :expand-trigger="cascader.expandTrigger || expandTrigger"
        :show-all-levels="cascader.showAllLevels || showAllLevels"
        :change-on-select='cascader.changeOnSelect || changeOnSelect'
        :debounce='cascader.debounce || debounce'
        :clearable='cascader.clearable || clearable'
        :props="cascader.props || props"
        :filterable='cascader.filterable|| filterable'
        :separator='cascader.separator||separator'
        :placeholder='cascader.placeholder||placeholder'
        :popper-class='cascader.popperClass||popperClass'
        :size='cascader.size||size'
        :before-filter='cascader.beforeFilter||beforeFilter'
        @active-item-change='activeItemChange'
        >
    </el-cascader>
</template>

<script>
  export default {
    name: 'GlCascader',
    props: {
      cascader: {
        type: Object,
        default: _ => {
          return {}
        }
      },
      options: {
        type: Array,
        default: _ => []
      },
      value: {
        type: Array,
        default: _ => []
      },
      expandTrigger: {
        type: String,
        default: 'click'
      },
      showAllLevels: {
        type: Boolean,
        default: true
      },
      changeOnSelect: {
        type: Boolean,
        default: false
      },
      debounce: {
        type: Number,
        default: 300
      },
      clearable: {
        type: Boolean,
        default: false
      },
      props: {
        type: Object,
        default: _ => {
          return {}
        }
      },
      filterable: {
        type: Boolean
      },
      separator: {
        type: String,
        default: '/'
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      popperClass: {
        type: String
      },
      size: {
        type: String
      },
      beforeFilter: {
        type: Function,
        default: _ => null
      }
  
    },
    data() {
      return {
        model_: this.value
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
    },
    methods: {
      activeItemChange(val) {
        this.$emit('active-item-change', val)
      }
    }
  }
</script>

<template>
    <el-select 
      v-model="model_"
      :value-key='select.valueKey || valueKey'
      :placeholder='select.placeholder || placeholder'
      :disabled='select.disabled || disabled'
      :clearable='select.clearable || clearable'
      :multiple='select.multiple || multiple'
      :collapse-tags='select.collapseTags || collapseTags'
      :multiple-limit='select.multipleLimit || multipleLimit'
      :size='select.size || size'
      :name='select.name || name'
      :filterable='select.filterable || filterable'
      :filter-method='select.filterMethod || filterMethod'
      :remote='select.remote || remote'
      :remote-method='select.remoteMethod || remoteMethod'
      :loading='select.loading || loading'
      :loading-text='select.loadingText || loadingText'
      :no-match-text='select.noMatchText || noMatchText'
      :no-data-text='select.noDataText || noDataText'
      :automatic-dropdown='select.automaticDropdown || automaticDropdown'
      :popper-append-to-body='select.popperAppendToBody || popperAppendToBody'
      :auto-complete='select.autoComplete || autoComplete'
      :allow-create='select.allowCreate || allowCreate'
      :popper-class='select.popperClass || popperClass'
      :reserve-keyword='select.reserveKeyword || reserveKeyword'
      :default-first-option='select.defaultFirstOption || defaultFirstOption'
      @visible-change='visibleChange'
      @remove-tag='removeTag'
      @clear='clear'
    >
      <slot></slot>
      <slot name="prefix" slot="prefix"></slot>
    </el-select>
</template>

<script>
    export default {
      name: 'GlSelect',
      props: {
        select: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        value: {
          type: null
        },
        multiple: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        },
        valueKey: {
          type: String,
          default: 'value'
        },
        size: {
          type: String
        },
        clearable: {
          type: Boolean,
          default: false
        },
        collapseTags: {
          type: Boolean,
          default: false
        },
        multipleLimit: {
          type: Number,
          default: 0
        },
        name: {
          type: String
        },
        autoComplete: {
          type: String,
          default: 'off'
        },
        placeholder: {
          type: String,
          default: '请选择'
        },
        filterable: {
          type: Boolean,
          default: false
        },
        allowCreate: {
          type: Boolean,
          default: false
        },
        filterMethod: {
          type: Function
        },
        remote: {
          type: Boolean,
          default: false
        },
        remoteMethod: {
          type: Function
        },
        loading: {
          type: Boolean,
          default: false
        },
        loadingText: {
          type: String,
          default: '加载中'
        },
        noMatchText: {
          type: String,
          default: '无匹配数据'
        },
        noDataText: {
          type: String,
          default: '无数据'
        },
        popperClass: {
          type: String
        },
        reserveKeyword: {
          type: Boolean,
          default: false
        },
        defaultFirstOption: {
          type: Boolean,
          default: false
        },
        popperAppendToBody: {
          type: Boolean,
          default: true
        },
        automaticDropdown: {
          type: Boolean,
          default: false
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
        visibleChange(val) {
          this.$emit('visible-change', val)
        },
        removeTag(val) {
          this.$emit('remove-tag', val)
        },
        clear(val) {
          this.$emit('clear', val)
        }
      }
    }
</script>
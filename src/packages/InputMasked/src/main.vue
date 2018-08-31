<template>
  <div class="masked-box" ref="maskedBox">
     <!-- 前置内容 -->
    <span class="prepend" v-if="$slots.prepend"><slot name='prepend'></slot></span>
    <masked-input
      class="masked"
      v-model="model_" 
      :mask='mask_'
      :placeholder="placeholder"
      :placeholderChar='placeholderChar'
      :keepCharPositions='keepCharPositions'
      :guide="guide"
    />
    <!-- 头部内容 -->
    <span class="prefix" v-if="$slots.prefix || prefixIcon">
      <slot name='prefix'></slot>
      <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
      </i>
    </span>
    <!-- 尾部内容 -->
    <span class="suffix" v-if="$slots.suffix || suffixIcon || showClear">
        <template v-if="!showClear">
          <slot name='suffix'></slot>
          <i class="el-input__icon"
            v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </template>
        <i v-else
          class="el-input__icon el-icon-circle-close el-input__clear clear"
          @click="clear"
        ></i>
      </span>
    <!-- 后置内容 -->
    <span class="append" v-if="$slots.append"><slot name='append'></slot></span>
  </div>
</template>

<script type='text/ecmascript-6'>
import emailMask from 'text-mask-addons/dist/emailMask'
import MaskedInput from 'vue-text-mask'
export default {
  name: 'GlMasked',
  components: {
    MaskedInput
  },
  data() {
    return {
      mask_: this.email ? emailMask : this.mask,
      model_: this.value,
      prefix: true,
      suffix: true,
      prepend: true,
      append: true
    }
  },
  props: {
    keepCharPositions: {
      type: Boolean,
      default: false
    },
    guide: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean
    },
    value: {
      type: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    mask: {
      type: null
    },
    placeholder: String,
    placeholderChar: {
      type: String,
      default: '_'
    },
    size: String,
    suffixIcon: String,
    prefixIcon: String
  },
  watch: {
    model_(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.model_ = val
    }
  },
  methods: {
    clear() {
      this.model_ = ''
    }
  },
  computed: {
    showClear() {
      return this.clearable && this.model_ !== ''
    }
  },
  mounted() {
    switch (this.size) {
      case 'mini':
        this.$refs.maskedBox.classList.add('mini')
        break
      case 'medium':
        this.$refs.maskedBox.classList.add('medium')
        break
      case 'small':
        this.$refs.maskedBox.classList.add('small')
        break
    }
    if (this.prepend) {
      this.$refs.maskedBox.classList.add('group')
      this.$refs.maskedBox.classList.add('group-prepend')
    }
    if (this.append) {
      this.$refs.maskedBox.classList.add('group')
      this.$refs.maskedBox.classList.add('group-append')
    }
    if (this.prefix) {
      this.$refs.maskedBox.classList.add('group')
      this.$refs.maskedBox.classList.add('group-prefix')
    }
    if (this.suffix) {
      this.$refs.maskedBox.classList.add('group')
      this.$refs.maskedBox.classList.add('group-suffix')
    }
  }
}
</script>

<style scoped>
  .masked-box{
    position: relative;
    font-size: 14px;
  }
  .group{
    line-height: normal;
    display: inline-table;
    width: 100%;
  }
  .masked{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .masked:focus{
    border-color: #409eff;
    outline: 0;
  }
  .masked::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: inherit;
  }
  .masked-box .prepend{
    position: absolute;
    left: 0;
    top: 0;
  }
  .group .append, .group .prepend {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    font-size: inherit;
  }
  .group .masked{
    vertical-align: middle;
    display: table-cell;
  }
  .group-prepend .masked,.group-append .append{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .group-append .append{
    border-left: 0;
  }
  .group-prepend .prepend{
    border-right: 0;
  }
  .group-prepend .prepend,.group-append .masked{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .group .prefix,.group .suffix,.clear{
    position: absolute;
    top: 0;
    transition: all .3s;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
  }
  .group-prefix .masked{
    padding-left: 30px;
  }
  .group-prefix .prefix{
    left: 5px;
  }
  .group-suffix .masked{
    padding-right: 30px;
  }
  .group-suffix .suffix,.clear{
    right: 5px;
  }
  .medium .masked,medium .el-input__icon{
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }
  .small .masked,.small .el-input__icon{
    height: 32px;
    line-height: 32px;
    font-size: 13px;
  }
  .mini .masked,.mini .el-input__icon{
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }
  .masked-box .clear{
    cursor: pointer;
  }
</style>

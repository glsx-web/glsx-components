<template>
  <div>
    <div class="masked-box" ref="maskedBox" :class="inputSize" v-if="!ip">
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
    <div ref="ipBox" v-else :class="inputSize">
      <span class="prepend" v-if="$slots.prepend"><slot name='prepend'></slot></span>
      <vue-ip-input ref='ip' :ip="value" :on-change="onIpChange" :on-blur="onIpBlur" class="masked"></vue-ip-input>
      <span class="prefix" v-if="$slots.prefix || prefixIcon">
        <slot name='prefix'></slot>
        <i class="el-input__icon"
            v-if="prefixIcon"
            :class="prefixIcon">
        </i>
      </span>
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
      <span class="append" v-if="$slots.append"><slot name='append'></slot></span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import emailMask from 'text-mask-addons/dist/emailMask'
// import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import MaskedInput from 'vue-text-mask'
import VueIpInput from 'vue-ip-input'
export default {
  name: 'GlMasked',
  components: {
    MaskedInput,
    VueIpInput
  },
  inject: {
    glForm: {
      default: ''
    },
    glFormItem: {
      default: ''
    }
  },
  data() {
    return {
      mask_: this.email ? emailMask : this.mask,
      model_: this.value
    }
  },
  props: {
    ip: {
      type: Boolean,
      default: false
    },
    keepCharPositions: Boolean,
    guide: Boolean,
    email: Boolean,
    value: null,
    clearable: Boolean,
    mask: null,
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
    },
    onIpChange(ip) {
      this.model_ = ip
      this.$emit('input', ip)
    },
    onIpBlur(ip) {
      this.model_ = ip
      this.$emit('input', ip)
      this.$refs.ip.$el.classList.remove('active')
    },
    valid(val) {
      if (val.target.value === '') {
        this.$refs.ip.$el.classList.add('err')
      } else {
        this.$refs.ip.$el.classList.add('active')
        this.$refs.ip.$el.classList.remove('err')
      }
    }
  },
  computed: {
    showClear() {
      return this.clearable && this.model_ !== ''
    },
    inputSize() {
      return this.size || this.glForm.size || this.glFormItem.size
    }
  },
  mounted() {
    if (this.ip) {
      const clearStyle = {
        'boxSizing': 'border-box',
        'verticalAlign': 'top',
        'flex': 1,
        'textAlign': 'center',
        'height': '100%'
      }
      for (let i = 0; i < 4; i++) {
        for (const key in clearStyle) {
          this.$refs.ip.$el.childNodes[i].style[key] = clearStyle[key]
        }
        this.$refs.ip.$el.childNodes[i].childNodes[0].style.height = clearStyle.height
        this.$refs.ip.$el.childNodes[i].childNodes[0].style.width = '90%'
        this.$refs.ip.$el.childNodes[i].childNodes[0].onfocus = val => this.valid(val)
        this.$refs.ip.$el.childNodes[i].childNodes[0].onkeyup = val => this.valid(val)
      }
    }
    if (this.$slots.prepend) {
      if (!this.ip) {
        this.$refs.maskedBox.classList.add('group')
        this.$refs.maskedBox.classList.add('group-prepend')
      } else {
        this.$refs.ipBox.classList.add('group')
        this.$refs.ipBox.classList.add('group-prepend')
      }
    }
    if (this.$slots.append) {
      if (!this.ip) {
        this.$refs.maskedBox.classList.add('group')
        this.$refs.maskedBox.classList.add('group-append')
      } else {
        this.$refs.ipBox.classList.add('group')
        this.$refs.ipBox.classList.add('group-append')
      }
    }
    if (this.prefixIcon || this.$slots.prefix) {
      if (!this.ip) {
        this.$refs.maskedBox.classList.add('group')
        this.$refs.maskedBox.classList.add('group-prefix')
      } else {
        this.$refs.ipBox.classList.add('group')
        this.$refs.ipBox.classList.add('group-prefix')
      }
    }
    if (this.suffixIcon || this.$slots.suffix) {
      if (!this.ip) {
        this.$refs.maskedBox.classList.add('group')
        this.$refs.maskedBox.classList.add('group-suffix')
      } else {
        this.$refs.ipBox.classList.add('group')
        this.$refs.ipBox.classList.add('group-suffix')
      }
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
  .group .ip-input-container{
    display: flex;
  }
  .ip-input-container{
    width: 100%;
    font-size: 0;
    display: flex;
  }
  .active{
    border-color: #409eff;
    outline: 0;
  }
  .err{
    border-color: #f56c6c;
    outline: 0;
  }
</style>

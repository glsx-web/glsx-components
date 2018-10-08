<template>
  <div>
    <div class="masked-box" ref="maskedBox" :class="inputSize" v-if="!ip" @mouseover='hovering = true' @mouseout="hovering = false">
      <i ref="clear" v-show="showClear" class="el-input__icon el-icon-circle-close el-input__clear clear"
         @click="clear"
        ></i>
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
        @focus='focused = true'
        @blur="focused = false"
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
      <span class="suffix" v-if="$slots.suffix || suffixIcon">
          <template v-if="!showClear">
            <slot name='suffix'></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
        </span>
      <!-- 后置内容 -->
      <span class="append" ref='append' v-show="$slots.append"><slot name='append'></slot></span>
    </div>
    <div class="ip-box" ref="ipBox" v-else :class="inputSize"  @mouseover='hovering = true' @mouseout="hovering = false">
      <i ref="clear" v-show="showClear" class="el-input__icon el-icon-circle-close el-input__clear clear"
         @click="clear"
        ></i>
      <span class="prepend" v-if="$slots.prepend"><slot name='prepend'></slot></span>
      <div class="ip-input-container masked" ref='ipItem' >
        <div class="ip-item"
           v-for="(item, index) in ip_item" 
          :key="index"
        >
          <input 
          ref="ip" 
          v-model="item.value"
          maxlength="3" 
          @input="valid(item.value, index, $event)"
          @focus="ipFocus(item.value, index, $event)"
          @blur="ipBlur(item.value, index, $event)"
          @keydown="keyBack(item.value, index, $event)"
          />
        </div>   
      </div> 

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
        </span>
      <span class="append" v-show="$slots.append" ref='append'><slot name='append'></slot></span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import emailMask from 'text-mask-addons/dist/emailMask'
// import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import MaskedInput from 'vue-text-mask'
const reg = new RegExp(/^[0-9]*$/)
export default {
  name: 'GlMasked',
  components: {
    MaskedInput
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
      model_: this.value,
      ip_item: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      focused: false,
      hovering: false
    }
  },
  props: {
    ip: Boolean,
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
  computed: {
    showClear() {
      var ip = true
      if (this.ip) {
        ip = false
        this.ip_item.forEach(el => {
          if (el.value !== null && el.value !== '') ip = true
        })
      }
      return this.clearable && this.model_ !== '' && ip && (this.focused || this.hovering)
    },
    inputSize() {
      return this.size || this.glForm.size || this.glFormItem.size
    }
  },
  watch: {
    model_(val) {
      this.$emit('input', val)
    },
    value(val) {
      if (this.ip) {
        if (this.value !== '') {
          const _ip_ = this.value.split('.')
          for (let index = 0; index < 4; index++) {
            this.$set(this.ip_item[index], 'value', _ip_[index])
          }
        } else {
          for (let index = 0; index < 4; index++) {
            this.$set(this.ip_item[index], 'value', '')
          }
        }
      } else {
        this.model_ = val
      }
    },
    showClear(val) {
      if (this.$slots.append && val) this.$refs.clear.style.right = `${this.$refs.append.offsetWidth + 5}px`
    }
  },
  methods: {
    valid(val, index, $event) {
      if (val.split('')[0] === '0' && val.length === 3) {
        if (index !== 3) {
          this.$refs.ip[index + 1].focus()
        }
      }
      if (val.length === 3) if (index !== 3) this.$refs.ip[index + 1].focus()
      if (index === 3 && val.length === 3) this.$refs.ip[index].blur()
      if (!reg.test(val)) this.ip_item[index].value = ''
      if (val > 255) this.ip_item[index].value = 255
      this.check($event)
      this.changeValue()
    },
    check(obj) {
      if (obj.target.value === '') {
        this.$refs.ipItem.classList.add('err')
      } else {
        this.$refs.ipItem.classList.add('active')
        this.$refs.ipItem.classList.remove('err')
      }
    },
    keyBack(val, index, $event) {
      if ($event.keyCode === 8) {
        if (val.length === 0) {
          if (index !== 0) {
            this.$refs.ip[index - 1].focus()
          }
        }
      }
      if ($event.keyCode === 13) this.changeValue()
    },
    changeValue() {
      let str = ''
      for (let index = 0; index < this.ip_item.length; index++) {
        index === 0 ? str += this.ip_item[index].value : str += `.${this.ip_item[index].value}`
      }
      this.$emit('input', str)
    },
    clear() {
      if (!this.ip) {
        this.model_ = ''
      } else {
        for (let index = 0; index < 4; index++) {
          this.ip_item[index].value = ''
        }
      }
      this.$emit('input', '')
      this.$emit('change', '')
    },
    ipBlur(val, index, $event) {
      if (val.split('')[0] === '0' && val.length > 1) {
        this.ip_item[index].value = val.length === 2 ? val.split('')[1] : val.split('')[1] + val.split('')[2]
        if (val.split('')[1] === '0') this.ip_item[index].value = val.split('')[2]
      }
      this.focused = false
      this.changeValue()
      this.$refs.ipItem.classList.remove('err')
      this.$refs.ipItem.classList.remove('active')
    },
    ipFocus(val, index, $event) {
      this.focused = true
      this.check($event)
    }
  },
  mounted() {
    if (this.ip) {
      if (this.value !== '') {
        const _ip_ = this.value.split('.')
        for (let index = 0; index < 4; index++) {
          this.$set(this.ip_item[index], 'value', _ip_[index])
        }
      } else {
        for (let index = 0; index < 4; index++) {
          this.$set(this.ip_item[index], 'value', '')
        }
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
      this.$refs.clear.style.right = `${this.$refs.append.offsetWidth + 46}px`
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
  .masked-box,.ip-box{
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
  .group .prefix,.group .suffix{
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
  .group-suffix .suffix{
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
  .group .ip-input-container{
    display: flex;
  }
  .ip-input-container{
    /* width: 100%; */
    vertical-align: middle;
    font-size: 0;
    display: flex;
    box-sizing: border-box;
  }
  .active{
    border-color: #409eff;
    outline: 0;
  }
  .err{
    border-color: #f56c6c;
    outline: 0;
  }
  .clear{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    color: #C4C4CC;
    cursor: pointer;
  }
  .ip-item{
    flex: 1;
    display: inline-block;
    width: 25%;
    box-sizing: border-box;
    
  }
  .ip-item::after{
    width: 10%;
    display: inline-block;
    content: '.';
    font-size: 16px;
  }
  .ip-item:last-of-type::after{
    display: none;
  }
  .ip-item input{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    width: 90%;
    outline: none;
    border: none;
    text-align: center;
  }
</style>

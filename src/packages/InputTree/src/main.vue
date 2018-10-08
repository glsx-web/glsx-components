<template>
  <div class='inputTree' @mouseover="inThis = true" @mouseout="inThis = false" @click="openTree" ref='inputTree'>
    <el-input
      v-model="model_"
      :placeholder="placeholder"
      :suffix-icon="icon"
      @blur="closeTree"
      clearable
      class="input"
      ref="input"
      :size='inputSize'
    ></el-input>
    <div class="treebox" v-if="tree" :style="{top:top}">
      <div class="arrow"></div>
      <div class="tree" :style="treeStyle">
        <el-tree 
        :data='data_'
        :props='props'
        @node-click='click'
        node-key='id'
        >
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'GlInputTree',
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
        model_: this.value,
        tree: false,
        top: 0,
        icon: 'el-icon-caret-bottom',
        data_: [],
        inThis: false
      }
    },
    props: {
      data: Array,
      value: String,
      size: String,
      placeholder: {
        type: String,
        default: '请选择'
      },
      props: {
        type: Object,
        default: () => {
          return {
            label: 'label',
            children: 'children'
          }
        }
      },
      treeStyle: {
        type: Object,
        default: () => {
          return {
            maxHeight: '300px'
          }
        }
      }
    },
    computed: {
      inputSize() {
        return this.size || this.glForm.size || this.glFormItem.size
      }
    },
    mounted() {
      if (this.props['children'] === undefined) this.props['children'] = 'children'
    },
    watch: {
      tree(val) {
        this.icon = val ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      },
      value(val) {
        this.model_ = val
      },
      model_(val) {
        const data = this.data
        this.data_ = val === '' ? this.data : []
        if (val !== '') this.searchLabel(data)
      }
    },
    methods: {
      searchLabel(data) {
        data.forEach(el => {
          if (el[this.props.label].indexOf(this.model_) !== -1) {
            this.data_.push(el)
          }
          if (el[this.props.children]) {
            this.searchLabel(el[this.props.children])
          }
        })
      },
      openTree(val) {
        if (this.data_.length === 0) this.data_ = this.data
        this.tree = true
        this.top = `${this.$refs.input.$el.offsetHeight + 10}px`
      },
      click(data, node, vue) {
        this.$emit('node-click', data, node, vue, this.props)
        this.$refs.input.$el.children[0].focus()
        if (data[this.props.children]) {
          return
        } else {
          this.choose(data)
        }
      },
      closeTree() {
        if (!this.inThis) {
          if (this.model_ !== '' && this.data_.length > 0) {
            this.data_.forEach(el => {
              if (this.model_ !== el[this.props.label]) {
                if (el[this.props.label].indexOf(this.model_)) {
                  this.model_ = this.data_[0][this.props.label]
                  this.$emit('input', this.model_)
                }
              }
            })
          }
          if (this.data_.length === 0) this.model_ = ''
          this.tree = false
        }
      },
      choose(data) {
        this.model_ = data[this.props.label]
        this.tree = false
        this.$emit('input', this.model_)
      }
    }
  }
</script>

<style scoped>
  .inputTree{
    position: relative;
  }
  .treebox{
    width: 100%;
    position: absolute;
    padding: 15px;
    left: 0;
    background: #fff;
    z-index: 99;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .tree{
    overflow-y: scroll;
  }
  .tree::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
    border-radius: 8px;
  }
  .tree::-webkit-scrollbar-thumb {
    background-color: hsla(220,4%,58%,.3);
    border-radius: 8px;
  }
  .arrow{
    position: absolute;
    left: 50%;
    top: -13px;
    border-top: 6px solid transparent;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: 6px solid #e5e5e5;
    transform: translateX(-50%);
  }
  .arrow::after{
    content: '';
    position: absolute;
    left: 50%;
    top: -3px;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid #fff;
    transform: translateX(-50%);
  }
</style>
<template>
  <div class='inputTree' @mouseover="inThis = true" @mouseout="inThis = false" @click="openTree">
    <el-input
      v-model="model_"
      placeholder="请选择"
      :suffix-icon="icon"
      @blur="closeTree"
      class="input"
      ref="input"
      @input='search'
    ></el-input>
    <div class="tree" v-if="tree" :style="{top:top}">
      <el-tree 
      :data='data_'
      @node-click='click'
      node-key='id'
      :render-content="renderContent">
      </el-tree>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'GlInputTree',
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
      value: null,
      props: {
        type: Object,
        default: () => {
          return {
            label: 'label',
            children: 'children'
          }
        }
      }
    },
    watch: {
      tree(val) {
        this.icon = val ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      }
    },
    methods: {
      search(val) {
        const data = this.data
        this.data_ = val === '' ? this.data : []
        if (val !== '') this.searchLabel(data)
      },
      searchLabel(data) {
        const rex = new RegExp(`${this.model_}`, 'g')
        data.forEach(el => {
          if (rex.test(el.label)) {
            this.data_.push(el)
          }
          if (el.children) {
            this.searchLabel(el.children)
          }
        })
      },
      openTree(val) {
        if (this.data_.length === 0) this.data_ = this.data
        this.tree = true
        this.top = `${this.$refs.input.$el.offsetHeight}px`
      },
      click() {
        this.$refs.input.$el.children[0].focus()
      },
      closeTree() {
        if (!this.inThis) {
          if (this.model_ !== '') {
            const rex = new RegExp(`${this.model_}`, 'g')
            this.data_.forEach(el => {
              if (this.model_ !== el.label) {
                if (rex.test(el.label)) {
                  this.model_ = el.label
                  this.$emit('input', el.label)
                }
              }
            })
          }
          this.tree = false
        }
      },
      choose(data) {
        this.model_ = data.label
        this.tree = false
        this.$emit('input', data.label)
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class='custom-tree-node'>
            <span>{node.label}</span>
            <span>
              <el-button size='mini' type='text' on-click={ () => this.choose(data) }>确定</el-button>
            </span>
          </span>)
      }
    }
  }
</script>

<style scoped>
  .inputTree{
    position: relative;
  }
  .tree{
    width: 100%;
    position: absolute;
    padding: 15px;
    left: 0;
    background: #fff;
    z-index: 99;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
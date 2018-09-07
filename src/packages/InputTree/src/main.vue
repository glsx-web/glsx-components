<template>
  <div class='inputTree' @mouseover="inThis = true" @mouseout="inThis = false" @click="openTree">
    <el-input
      v-model="model_"
      placeholder="请选择"
      :suffix-icon="icon"
      @blur="closeTree"
      class="input"
      ref="input"
      @input='change'
    ></el-input>
    <div class="tree" v-if="tree" :style="{top:top}">
      <el-tree 
      :data='data_'
      @node-click='click'
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
      value: null
    },
    watch: {
      tree(val) {
        this.icon = val ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      }
    },
    methods: {
      change(val) {
        this.data_ = val === '' ? this.data : []
        for (const iterator of this.data) {
          if (val !== '') {
            const rex = new RegExp(`${val}`, 'g')
            if (iterator['children']) {
              for (const children of iterator['children']) {
                if (rex.test(children['label'])) {
                  this.data_.push(children)
                }
              }
            }
            if (rex.test(iterator['label'])) {
              this.data_.push(iterator)
            }
          }
        }
      },
      openTree(val) {
        this.data_ = this.data
        this.tree = true
        this.top = `${this.$refs.input.$el.offsetHeight}px`
      },
      click() {
        this.$refs.input.$el.children[0].focus()
      },
      closeTree() {
        if (!this.inThis) this.tree = false
      },
      choose(data, node, vue) {
        this.model_ = data.label
        this.tree = false
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
    },
    mounted() {
  
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
  }
</style>
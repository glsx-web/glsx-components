<template>
  <div class='inputTree' @mouseover="inThis = true" @mouseout="inThis = false" @click="openTree">
    <el-input
      v-model="model_"
      placeholder="请选择"
      :suffix-icon="icon"
      @blur="closeTree"
      class="input"
      ref="input"
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
    mounted() {
      if (this.props['children'] === undefined) this.props['children'] = 'children'
    },
    watch: {
      tree(val) {
        this.icon = val ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      },
      model_(val) {
        const data = this.data
        this.data_ = val === '' ? this.data : []
        if (val !== '') this.searchLabel(data)
      }
    },
    methods: {
      searchLabel(data) {
        // const rex = new RegExp(`${this.model_}`, 'g')
        data.forEach(el => {
          // if (el[this.props.label].search(rex) !== -1) {
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
        this.top = `${this.$refs.input.$el.offsetHeight + 25}px`
      },
      click(data, node, vue) {
        this.$refs.input.$el.children[0].focus()
        if (data[this.props.children]) {
          return
        } else {
          this.choose(data)
        }
      },
      closeTree() {
        if (!this.inThis) {
          if (this.model_ !== '') {
            // const rex = new RegExp(`${this.model_}`, 'g')
            this.data_.forEach(el => {
              if (this.model_ !== el[this.props.label]) {
                // if (rex.test(el[this.props.label])) {
                if (this.model_ !== el[this.props.label]) {
                  this.model_ = el[this.props.label]
                  this.$emit('input', this.model_)
                }
              }
            })
          }
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
    top: -42px;
    border-top: 21px solid transparent;
    border-right: 21px solid transparent;
    border-left: 21px solid transparent;
    border-bottom: 21px solid #e5e5e5;
    transform: translateX(-50%);
  }
  .arrow::after{
    content: '';
    position: absolute;
    left: 50%;
    top: -18px;
    border-top: 20px solid transparent;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    border-bottom: 20px solid #fff;
    transform: translateX(-50%);
  }
</style>
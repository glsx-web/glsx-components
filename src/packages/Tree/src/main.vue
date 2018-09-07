<template>
  <el-tree 
    :data="tree.data || data"
    :empty-text='tree.emptyText || emptyText'
    :node-key='tree.nodeKey || nodeKey'
    :props='tree.props || props'
    :render-after-expand='tree.renderAfterExpand || renderAfterExpand'
    :load='tree.load || load'
    :render-content='tree.renderContent || renderContent'
    :highlight-current='tree.highlightCurrent || highlightCurrent'
    :default-expand-all='tree.defaultExpandAll || defaultExpandAll'
    :expand-on-click-node='tree.expandOnClickNode || expandOnClickNode'
    :check-on-click-node='tree.checkOnClickNode || checkOnClickNode'
    :auto-expand-parent='tree.autoExpandParent || autoExpandParent'
    :default-expanded-keys='tree.defaultExpandedKeys || defaultExpandedKeys'
    :show-checkbox='tree.showCheckbox || showCheckbox'
    :check-strictly='tree.checkStrictly || checkStrictly'
    :default-checked-keys='tree.defaultCheckedKeys || defaultCheckedKeys'
    :filter-node-method='tree.filterNodeMethod || filterNodeMethod'
    :accordion='tree.accordion || accordion'
    :indent='tree.indent || indent'
    :lazy='tree.lazy || lazy'
    :draggable='tree.draggable || draggable'
    :allow-drag='tree.allowDrag || allowDrag'
    :allow-drop='tree.allowDrop || allowDrop'
    @node-click='nodeClick'
    @node-contextmenu='nodeContextmenu'
    @check-change='checkChange'
    @check='check'
    @current-change='currentChange'
    @node-expand='nodeExpand'
    @node-collapse='nodeCollapse'
    @node-drag-start='nodeDragStart'
    @node-drag-enter='nodeDragEnter'
    @node-drag-leave='nodeDragLeave'
    @node-drag-over='nodeDragOver'
    @node-drag-end='nodeDragEnd'
    @node-drop='nodeDrop'
    ref='tree'
  >
    <slot name='content' slot-scope="{ node, data }"></slot>
  </el-tree>
</template>

<script>
    export default {
      name: 'GlTree',
      props: {
        tree: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        data: {
          type: Array
        },
        emptyText: {
          type: String
        },
        nodeKey: {
          type: String
        },
        props: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        renderAfterExpand: {
          type: Boolean,
          default: true
        },
        load: {
          type: Function
        },
        renderContent: {
          type: Function
        },
        highlightCurrent: {
          type: Boolean,
          default: false
        },
        defaultExpandAll: {
          type: Boolean,
          default: false
        },
        expandOnClickNode: {
          type: Boolean,
          default: true
        },
        checkOnClickNode: {
          type: Boolean,
          default: false
        },
        autoExpandParent: {
          type: Boolean,
          default: true
        },
        defaultExpandedKeys: {
          type: Array,
          default: _ => []
        },
        showCheckbox: {
          type: Boolean,
          default: false
        },
        checkStrictly: {
          type: Boolean,
          default: false
        },
        defaultCheckedKeys: {
          type: Array,
          default: _ => []
        },
        filterNodeMethod: {
          type: Function
        },
        accordion: {
          type: Boolean,
          default: false
        },
        indent: {
          type: Number,
          default: 16
        },
        lazy: {
          type: Boolean,
          default: false
        },
        draggable: {
          type: Boolean,
          default: false
        },
        allowDrag: {
          type: Function
        },
        allowDrop: {
          type: Function
        }
      },
      data() {
        return {
        }
      },
      methods: {
        nodeClick(a, b, c) {
          this.$emit('node-click', a, b, c)
        },
        nodeContextmenu(a, b, c, d) {
          this.$emit('node-contextmenu', a, b, c, d)
        },
        checkChange(a, b, c) {
          this.$emit('check-change', a, b, c)
        },
        check(a, b) {
          this.$emit('check', a, b)
        },
        currentChange(a, b) {
          this.$emit('current-change', a, b)
        },
        nodeExpand(a, b, c) {
          this.$emit('node-expand', a, b, c)
        },
        nodeCollapse(a, b, c) {
          this.$emit('node-collapse', a, b, c)
        },
        nodeDragStart(a, b) {
          this.$emit('node-drag-start', a, b)
        },
        nodeDragEnter(a, b, c) {
          this.$emit('node-drag-enter', a, b, c)
        },
        nodeDragLeave(a, b, c) {
          this.$emit('node-drag-leave', a, b, c)
        },
        nodeDragOver(a, b, c) {
          this.$emit('node-drag-over', a, b, c)
        },
        nodeDragEnd(a, b, c, d) {
          this.$emit('node-drag-end', a, b, c, d)
        },
        nodeDrop(a, b, c, d) {
          this.$emit('node-drop', a, b, c, d)
        }
      }
    }
</script>

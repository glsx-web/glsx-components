<template>
    <el-pagination
        :small='pagination.small || small'
        :background='pagination.background || background'
        :page-size="pagination.pageSize || pageSize"
        :pageSizes='pagination.pageSizes || pageSizes'
        :total="pagination.total || total"
        :page-count="pagination.pageCount || pageCount"
        :pager-count='pagination.pagerCount || pagerCount'
        :currentPage='pagination.currentPage || currentPage'
        :layout='pagination.layout || layout'
        :popper-class='pagination.popperClass || popperClass'
        :prev-text='pagination.prevText || prevText'
        :next-text='pagination.nextText || nextText'
        :disabled='pagination.disabled || disabled'
        @size-change='sizeChange'
        @current-change='currentChange'
        @prev-click='prevClick'
        @next-click='nextClick'
    >
    </el-pagination>
</template>
<script>
export default {
  name: 'GlPagination',
  props: {
    pagination: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper, ->, total'
    },
    pageSizes: {
      type: Array,
      default: _ => [10, 20, 30, 40, 50, 100]
    },
    popperClass: {
      type: String
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sizeChange(val) {
      this.$emit('size-change', val)
    },
    currentChange(val) {
      this.$emit('current-change', val)
    },
    prevClick(val) {
      this.$emit('prev-click', val)
    },
    nextClick(val) {
      this.$emit('next-click', val)
    }
  }
}
</script>

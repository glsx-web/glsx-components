<template>
  <el-table-column
    :type="type"
    :index="index"
    :column-key="columnKey"
    :prop="prop"
    :label="label"
    :width="width"
    :min-width="minWidth"
    :render-header="renderHeader"
    :show-overflow-tooltip="showOverflowTooltip"
    :label-class-name="labelClassName"
    :class-name="className"
    :fixed="fixed"
    :align="align"
    :header-align="headerAlign"
    :formatter="formatter"
    :resizable="resizable"
    :sortable="sortable"
    :sort-method="sortMethod"
    :sort-by="sortBy"
    :sort-orders="sortOrders"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
    :filters="filters"
    :filter-placement="filterPlacement"
    :filter-multiple="filterMultiple"
    :filter-method="filterMethod"
    :filtered-value="filteredValue"
  >
    <template slot-scope="scope">
      <slot></slot>
    </template>
  </el-table-column>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'GlTableColumn',
  props: {
    type: String,
    index: [String, Function],
    columnKey: String,
    label: String,
    prop: String,
    width: String,
    minWidth: String,
    fixed: [String, Boolean],
    renderHeader: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    sortBy: [String, Array, Function],
    sortOrders: Array,
    resizable: {
      type: Boolean,
      default: true
    },
    formatter: Function,
    showOverflowTooltip: Boolean,
    align: {
      type: String,
      default: 'left'
    },
    headerAlign: String,
    className: String,
    labelClassName: String,
    selectable: Function,
    reserveSelection: Boolean,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      defaule: true
    },
    filterMethod: Function,
    filteredValue: Array
  },
  data() {
    return {}
  }
}
</script>
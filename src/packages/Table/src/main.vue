<template>
  <div class="tableBox" :style="table.style" >
    <div>
      <el-table
        ref="table"
        :data="this.pagination.show ? this.pageData : table.data"
        :stripe='table.stripe'
        :border='table.border'
        :height='table.height'
        :size='table.size'
        :fit='table.fit'
        :max-height='table.maxHeight'
        :resizable='table.resizable'
        :highlight-current-row='table.highlightCurrentRow'
        :show-header='table.showHeader'
        :empty-text='table.emptyText'
        :row-class-name='table.rowClassName'
        :cell-class-name='table.cellClassName'
        :tooltip-effect='table.tooltipEffect'
        :show-summary='table.showSummary'
        :summary-method='table.summaryMethod'
        :sum-text='table.sumText'
        :span-method='table.spanMethod'
        :row-style='table.rowStyle'
        :cell-style='table.cellStyle'
        :header-row-style='table.headerRowStyle'
        :header-row-class-name='table.headerRowClassName'
        :header-cell-class-name='table.headerCellClassName'
        :header-cell-style='table.headerCellStyle'
        :default-expand-all='table.expandAll'
        @select="select"
        @select-all='selectAll'
        @selection-change="selectionChange"
        @cell-mouse-enter='mouseHover'
        @cell-mouse-leave='mouseLeave'
        @cell-click='cellClick'
        @cell-dblclick='cellDblclick'
        @row-click='rowClick'
        @row-contextmenu='rowContextmenu'
        @row-dblclick='rowDblclick'
        @header-click='headerClick'
        @header-contextmenu='headerContextmenu'     
        @current-change='currentChange'
        @header-dragend='headerDragend'
        @expand-change='expandChange'>   
          <!-- 展开详情 -->
          <el-table-column type="expand"
            v-if="table.collapse"
            :fixed='table.collapse.fixed'>
            <template slot-scope="props">
              <el-form :label-position="table.collapse.labelPosition" :class="collapseClass">
                <el-form-item 
                  v-for='(i,index) in table.collapse.label'
                  :key='index'
                  :label="i"
                >
                  <span>{{props.row[table.collapse.prop[index]]}}</span>
                </el-form-item>
              </el-form>
            </template>
            </el-table-column>
            <!-- 多选框 -->
            <el-table-column
              v-if="table.selection"
              type="selection"
              :width="table.selection.width"
              :min-width='table.selection.minWidth'
              :fixed='table.selection.fixed'
              :align='table.selection.align || table.align'
              :header-align='table.selection.headerAlign || table.headerAlign'>
            </el-table-column>
            <!-- 序号 -->
            <el-table-column 
                v-if="table.number"
                :label='table.number.label'
                type="index"
                :index='table.number.index'
                :width='table.number.width'
                :min-width='table.number.minWidth'
                :fixed='table.number.fixed'
                :align='table.number.align || table.align'
                :header-align='table.number.headerAlign || table.headerAlign'>
            </el-table-column>
            <!-- 表格内容 -->
            <el-table-column
                v-for='(i,index) in table.column'
                :key='index'
                :prop='i.prop'
                :label='i.label'
                :width='i.width'
                :min-width='i.minWidth'
                :render-header='i.renderHeader'
                :show-overflow-tooltip='i.showOverflowTooltip || table.showOverflowTooltip'
                :label-class-name='i.labelClassName'
                :class-name='i.className'
                :fixed='i.fixed'
                :align='i.align || table.align'
                :header-align='i.headerAlign || table.headerAlign'
                :formatter='i.formatter'
                :resizable='i.resizable'>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              v-if="table.console"
              :fixed="table.console.fixed || 'right'"
              :label="table.console.label || '操作'"
              :width="table.console.width"
              :min-width="table.console.minWidth"
              :align='table.console.align || table.align'
              :header-align='table.console.headerAlign || table.headerAlign'
              >
              <template slot-scope="scope">
                <el-button           
                  :class="i.label ? '' : 'clearBtn'"
                  v-for="(i,index) in table.console.button"
                  :key="index"
                  :type="i.type"
                  :size="i.size"
                  :icon='i.icon'
                  @click.native.prevent="i.callback(scope.$index, pagination.show ? pageData : table.data)"
                  >
                    <template v-if="i.label">
                      {{i.label}}
                    </template>
                  </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>  
      <div 
        v-if="pagination.show"
        :style="pagination.style">
        <el-pagination         
            :small='pagination.small'
            :background='pagination.background'
            :page-size="pagination.pageSize"
            :pageSizes='pagination.pageSizes'
            :total="pagination.total"
            :page-count="pagination.pageCount"
            :pager-count='pagination.pagerCount'
            :current-page='pagination.currentPage'
            :layout='pagination.layout'
            :popper-class='pagination.popperClass'
            :prev-text='pagination.prevText'
            :next-text='pagination.nextText'
            :disabled='pagination.disabled'
            @size-change='sizeChange'
            @current-change='currentChange_'
            @prev-click='prevClick'
            @next-click='nextClick'
        >
        </el-pagination>
      </div>
      <div v-if="table.export === true" class="export" @keyup="keyupDialog($event)">
        <el-button @click="openDialog" >导出表格</el-button>
      </div>
      <el-dialog
          title="选择导出数据"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <el-radio-group v-model="radio" style="text-align:center;display:block;">
            <el-radio label='当前页'></el-radio>
            <el-radio label='全部'></el-radio>
            <el-radio label='选中'></el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消 (Esc)</el-button>
              <el-button type="primary" @click="exportTable">确 定 (Enter)</el-button>
          </span>
      </el-dialog>
   </div>
</template>

<script>
import XLSX from 'xlsx'
var end
const outputXlsxFile = (data, wscols, xlsxName) => {
  const ws = XLSX.utils.aoa_to_sheet(data)
  ws['!cols'] = wscols
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, xlsxName)
  XLSX.writeFile(wb, xlsxName + '.xlsx')
}
export default {
  name: 'GlTable',
  props: {
    table: {
      type: Object,
      default: _ => {
        return {}
      },
      required: true
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          show: false
        }
      }
    }
  },
  data() {
    return {
      arr: [],
      select_items: [],
      radio: '当前页',
      centerDialogVisible: false,
      tableData: [],
      pageData: [],
      selectionItem: [],
      headerContextmenu: this.table.headerContextmenu === undefined ? () => null : this.table.headerContextmenu,
      headerClick: this.table.headerClick === undefined ? () => null : this.table.headerClick,
      rowDblclick: this.table.rowDblclick === undefined ? () => null : this.table.rowDblclick,
      rowContextmenu: this.table.rowContextmenu === undefined ? () => null : this.table.rowContextmenu,
      rowClick: this.table.rowClick === undefined ? () => null : this.table.rowClick,
      cellDblclick: this.table.cellDblclick === undefined ? () => null : this.table.cellDblclick,
      cellClick: this.table.cellClick === undefined ? () => null : this.table.cellClick,
      mouseLeave: this.table.cellMouseLeave === undefined ? () => null : this.table.cellMouseLeave,
      mouseHover: this.table.cellMouseEnter === undefined ? () => null : this.table.cellMouseEnter,
      select: this.table.select === undefined ? this._select : this.table.select,
      selectAll: this.table.selectAll === undefined ? this._selectAll : this.table.selectAll,
      selectionChange: this.table.selectionChange === undefined ? this._selectionChange : this.table.selectionChange,
      currentChange: this.table.currentChange === undefined ? () => null : this.table.currentChange,
      headerDragend: this.table.headerDragend === undefined ? () => null : this.table.headerDragend,
      expandChange: this.table.expandChange === undefined ? () => null : this.table.expandChange,
      pageSize: this.pagination.pageSize === undefined ? 10 : this.pagination.pageSize,
      sizeChange: this.pagination.sizeChange === undefined ? this._sizeChange : this.pagination.sizeChange,
      currentChange_: this.pagination.currentChange === undefined ? this._currentChange : this.pagination.currentChange,
      prevClick: this.pagination.prevClick === undefined ? _ => null : this.pagination.prevClick,
      nextClick: this.pagination.nextClick === undefined ? _ => null : this.pagination.nextClick
    }
  },
  computed: {
    collapseClass() {
      return this.table.collapse.className || 'gl-collapse'
    }
  },
  methods: {
    openDialog() {
      this.select_items = []
      for (const iterator of this.arr) {
        if (iterator) this.select_items = [...this.select_items, ...iterator]
      }
      this.centerDialogVisible = true
    },
    keyupDialog(event) {
      if (event.key === 'Enter' && this.centerDialogVisible === true) this.exportTable()
    },
    exportTable() {
      const table = this.pagination.show ? this.radio === '全部' ? this.tableData : this.radio === '当前页' ? this.pageData : this.select_items : this.radio === '选中' ? this.selectionItem : this.table.data
      this.$prompt('请输入文件名', {
        confirmButtonText: '确 定 (Enter)',
        cancelButtonText: '取 消 (Esc)',
        inputValidator: _ => {
          return _ !== null
        },
        inputErrorMessage: '文件名不能为空！'
      }).then(({ value }) => {
        this.centerDialogVisible = false
        // 1宽度 ≈ 20像素
        const width = this.$refs.table.bodyWidth.replace('px', '') / this.table.column.length / 8
        const width_item = []
        for (let index = 0; index < this.table.column.length; index++) {
          width_item.push({ wch: Number.parseInt(width) })
        }
        outputXlsxFile(this.getData(this.table.column, table), width_item, value)
      }).catch(err => {
        console.log(err)
      })
    },
    getData(list, data) {
      const title = []
      const arr = []
      let arr2 = []
      for (let index = 0; index < list.length; index++) {
        title.push(list[index].label)
      }
      arr.push(title)
      for (let index = 0; index < data.length; index++) {
        for (let i = 0; i < list.length; i++) {
          arr2.push(data[index][list[i].prop])
        }
        arr.push(arr2)
        arr2 = []
      }
      return arr
    },
    _select(val) {
      this.selectionItem = val
      this.arr[this.pagination.currentPage - 1] = Array.from(new Set([...[], ...val]))
    },
    _selectAll(val) {
      this.arr[this.pagination.currentPage - 1] = val
    },
    _selectionChange(val) {
      this.selectionItem = val
    },
    _sizeChange(val) {
      this.pageSize = val
      this._currentChange(this.pagination.currentPage || 1)
      this.arr = []
    },
    _currentChange(val) {
      this.pagination.currentPage = val
      this.pageChangeFun(this.tableData)
    },
    pageChangeFun(list) {
      end = this.pagination.currentPage * this.pageSize
      this.pageData = []
      for (let start = (this.pagination.currentPage - 1) * this.pageSize; start < end; start++) {
        if (list[start]) {
          this.pageData.push(list[start])
        }
      }
      setTimeout(_ => {
        if (this.arr[this.pagination.currentPage - 1]) {
          this.arr[this.pagination.currentPage - 1].forEach(row => {
            this.$refs.table.toggleRowSelection(row)
          })
        }
      }, 10)
    },
    setData() {
      this.pagination.total = this.tableData.length
      if (this.pagination.total > this.pageSize) {
        for (let i = (this.pagination.currentPage - 1) * this.pageSize; i < this.pageSize * this.pagination.currentPage; i++) {
          this.pageData.push(this.tableData[i])
        }
      } else {
        this.pageData = this.tableData
      }
    },
    getTableData() {
      if (this.table.api) {
        this.$axios.get(this.table.api).then(res => {
          this.tableData = res.data.data
          this.setData()
        }).catch(err => {
          console.log(err)
        })
        this.setData()
      } else {
        this.tableData = this.table.data
        this.setData()
      }
    }
  },
  mounted() {
    this.pagination.currentPage === undefined ? this.pagination.currentPage = 1 : this.pagination.currentPage
    setTimeout(_ => {
      if (this.pageData.length === 0 && this.pagination.show) {
        this.getTableData()
      }
    }, 1000)
  }
}
</script>

<style>
  .gl-collapse .el-form-item {
    display: inline-block;
    margin-right: 0;
    width: 50%;
  }
    .gl-collapse .el-form-item .el-form-item__content{
      color: red;
      font-weight: 700;
    }
    .export{
      margin-top:20px;
    }
</style>
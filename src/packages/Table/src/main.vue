<template>
  <div class="tableBox" :style="table.style,{width:'100%'}">
    <div>
      <el-table
        ref="table"
        :data="table.data"
        :stripe="table.stripe"
        :border="table.border"
        :height="table.height"
        :size="table.size"
        :fit="table.fit"
        :max-height="table.maxHeight"
        :resizable="table.resizable"
        :highlight-current-row="table.highlightCurrentRow"
        :show-header="table.showHeader"
        :empty-text="table.emptyText"
        :row-class-name="table.rowClassName"
        :cell-class-name="table.cellClassName"
        :tooltip-effect="table.tooltipEffect"
        :show-summary="table.showSummary"
        :summary-method="table.summaryMethod"
        :sum-text="table.sumText"
        :span-method="table.spanMethod"
        :row-style="table.rowStyle"
        :cell-style="table.cellStyle"
        :header-row-style="table.headerRowStyle"
        :header-row-class-name="table.headerRowClassName"
        :header-cell-class-name="table.headerCellClassName"
        :header-cell-style="table.headerCellStyle"
        :default-expand-all="table.expandAll"
        :select-on-indeterminate='table.selectOnIndeterminate'
        :default-sort='table.defaultSort'
        :expand-row-keys='table.expandRowKeys'
        :row-key='table.rowKey'
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="mouseHover"
        @cell-mouse-leave="mouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
      >
        <!-- 展开详情 -->
        <el-table-column type="expand" v-if="table.collapse" :fixed="table.collapse.fixed">
          <template slot-scope="props">
            <el-form :label-position="table.collapse.labelPosition" :class="collapseClass">
              <el-form-item v-for="(i,index) in table.collapse.label" :key="index" :label="i">
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
          :min-width="table.selection.minWidth"
          :fixed="table.selection.fixed"
          :align="table.selection.align || table.align"
          :header-align="table.selection.headerAlign || table.headerAlign"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="table.number"
          :label="table.number.label"
          type="index"
          :index="table.number.index"
          :width="table.number.width"
          :min-width="table.number.minWidth"
          :fixed="table.number.fixed"
          :align="table.number.align || table.align"
          :header-align="table.number.headerAlign || table.headerAlign"
        ></el-table-column>
        <!-- 自定义表格内容 -->
        <template v-if='$slots.default'>
         <slot></slot>
        </template>
        <!-- 表格内容 -->
        <template v-else>
          <el-table-column
            v-for="(i,index) in table.column"
            :key="index"
            :prop="i.prop"
            :label="i.label"
            :width="i.width"
            :min-width="i.minWidth"
            :render-header="i.renderHeader"
            :show-overflow-tooltip="i.showOverflowTooltip || table.showOverflowTooltip"
            :label-class-name="i.labelClassName"
            :class-name="i.className"
            :fixed="i.fixed"
            :align="i.align || table.align"
            :header-align="i.headerAlign || table.headerAlign"
            :formatter="i.formatter"
            :resizable="i.resizable"
            :type="i.type"
            :index="i.index"
            :column-key="i.columnKey"
            :sortable="i.sortable"
            :sort-method="i.sortMethod"
            :sort-by="i.sortBy"
            :sort-orders="i.sortOrders"
            :selectable="i.selectable"
            :reserve-selection="i.reserveSelection"
            :filters="i.filters"
            :filter-placement="i.filterPlacement"
            :filter-multiple="i.filterMultiple"
            :filter-method="i.filterMethod"
            :filtered-value="i.filteredValue"
          ></el-table-column>
        </template>
        <!-- 操作 -->
        <el-table-column
          v-if="consoleShow"
          :fixed="table.console.fixed || 'right'"
          :label="table.console.label || '操作'"
          :width="table.console.width"
          :min-width="table.console.minWidth"
          :align="table.console.align || table.align"
          :header-align="table.console.headerAlign || table.headerAlign"
        >
          <template slot-scope="scope">
            <el-button
              :class="i.label ? '' : 'clearBtn'"
              v-for="(i,index) in table.console.button"
              :key="index"
              :type="i.type"
              :size="i.size"
              :icon="i.icon"
              @click.native.prevent="i.callback(scope.$index, table.data)"
            >
              {{i.formatter ? i.formatter( scope.row, scope.column, scope.$index ) : i.label}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="table.export || table.import" class="export" @keyup="keyupDialog($event)">
      <template v-if="table.export">
        <el-button @click="openDialog">导出表格</el-button>
      </template>
      <template v-if='table.import'>
        <el-button class="importBox">
          <input type="file" @change="importXlsx" ref="files">
          <span class="importBox-txt">导入表格</span>
        </el-button>
        <span class="importBox-tips">{{fileName === '' ? '未选择任何文件' : fileName}}</span>
      </template>
    </div>
    <el-dialog title="选择导出数据" :visible.sync="centerDialogVisible" width="30%" center>
      <el-radio-group v-model="radio" style="text-align:center;display:block;">
        <el-radio label="当前页"></el-radio>
        <!-- <el-radio label="全部" v-if="this.pagination.show"></el-radio> -->
        <el-radio label="选中" v-if="this.table.selection"></el-radio>
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
const outputXlsxFile = (data, wscols, xlsxName) => {
  const ws = XLSX.utils.aoa_to_sheet(data)
  ws['!cols'] = wscols
  const wb = XLSX.utils.book_new()
  // console.log(wb)
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
      }
    }
  },
  data() {
    return {
      consoleShow: false,
      fileName: '',
      arr: [],
      select_items: [],
      radio: '当前页',
      centerDialogVisible: false,
      selectionItem: [],
      headerContextmenu:
        this.table.headerContextmenu === undefined
          ? () => null
          : this.table.headerContextmenu,
      headerClick:
        this.table.headerClick === undefined
          ? () => null
          : this.table.headerClick,
      rowDblclick:
        this.table.rowDblclick === undefined
          ? () => null
          : this.table.rowDblclick,
      rowContextmenu:
        this.table.rowContextmenu === undefined
          ? () => null
          : this.table.rowContextmenu,
      rowClick:
        this.table.rowClick === undefined ? () => null : this.table.rowClick,
      cellDblclick:
        this.table.cellDblclick === undefined
          ? () => null
          : this.table.cellDblclick,
      cellClick:
        this.table.cellClick === undefined ? () => null : this.table.cellClick,
      mouseLeave:
        this.table.cellMouseLeave === undefined
          ? () => null
          : this.table.cellMouseLeave,
      mouseHover:
        this.table.cellMouseEnter === undefined
          ? () => null
          : this.table.cellMouseEnter,
      select:
        this.table.select === undefined ? () => null : this.table.select,
      selectAll:
        this.table.selectAll === undefined
          ? () => null
          : this.table.selectAll,
      selectionChange:
        this.table.selectionChange === undefined
          ? () => null
          : this.table.selectionChange,
      currentChange:
        this.table.currentChange === undefined
          ? () => null
          : this.table.currentChange,
      headerDragend:
        this.table.headerDragend === undefined
          ? () => null
          : this.table.headerDragend,
      expandChange:
        this.table.expandChange === undefined
          ? () => null
          : this.table.expandChange
    }
  },
  computed: {
    // 展开行className
    collapseClass() {
      return this.table.collapse.className || 'gl-collapse'
    }
  },
  methods: {
    // 导入
    importXlsx() {
      const file = this.$refs.files.files[0]
      if (file) {
        if (file.name.split('.')[1].toLowerCase() === 'xlsx') {
          const reader = new FileReader()
          reader.onload = e => {
            const workbook = XLSX.read(e.target.result, {
              type: 'binary'
            })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const headers = {}
            const data = []
            const keys = Object.keys(worksheet)
            let cols = []
            const column = []
            const arr = []
            // 过滤以 ! 开头的 key
            keys
              .filter(k => k[0] !== '!')
              // 遍历所有单元格
              .forEach(k => {
                // 如 A1 中的 A
                const col = k.substring(0, 1)
                // 如 A1 中的 1
                const row = parseInt(k.substring(1))
                // 当前单元格的值
                const value = worksheet[k].w
                // 保存字段名
                if (row === 1) {
                  headers[col] = value
                  return
                }
                // 解析成 JSON
                if (!data[row]) {
                  data[row] = {}
                }
                data[row][headers[col]] = value
                cols.push(col)
                cols = Array.from(new Set([...[], ...cols]))
              })
            for (let index = 0; index < cols.length; index++) {
              column.push({
                label: headers[cols[index]],
                prop: headers[cols[index]]
              })
            }
            for (const iterator of data) {
              if (iterator) arr.push(iterator)
            }
            this.$set(this.table, 'data', arr)
            this.$set(this.table, 'column', column)
          }
          reader.readAsBinaryString(file)
        } else {
          this.$message.error('只能上传xlsx文件')
        }
        this.fileName = file.name
      }
    },
    // 导出弹框
    openDialog() {
      this.select_items = []
      for (const iterator of this.arr) {
        if (iterator) this.select_items = [...this.select_items, ...iterator]
      }
      this.centerDialogVisible = true
    },
    keyupDialog(event) {
      if (event.key === 'Enter' && this.centerDialogVisible === true) { this.exportTable() }
    },
    // 导出
    exportTable() {
      const table = this.radio === '当前页' ? this.table.data : this.radio === '选中' ? this.selectionItem : this.table.data
      this.$prompt('请输入文件名', {
        confirmButtonText: '确 定 (Enter)',
        cancelButtonText: '取 消 (Esc)',
        inputValidator: _ => {
          return _ !== null
        },
        inputErrorMessage: '文件名不能为空！'
      })
        .then(({ value }) => {
          this.centerDialogVisible = false
          // 1宽度 ≈ 20像素
          const width = this.$refs.table.$refs.bodyWrapper.children[0]
            .children[1].children[0].cells
          const width_item = []
          for (let index = 0; index < this.table.column.length; index++) {
            width_item.push({ wch: width[index].offsetWidth / 8 })
          }
          outputXlsxFile(
            this.getData(this.table.column, table),
            width_item,
            value
          )
        })
        .catch(err => {
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
    }
  },
  mounted() {
    if (this.table.console) {
      if (this.table.console.show) this.consoleShow = true
    }
  }
}
</script>

<style>
.gl-collapse .el-form-item {
  display: inline-block;
  margin-right: 0;
  width: 50%;
}
.gl-collapse .el-form-item .el-form-item__content {
  color: red;
  font-weight: 700;
}
.export {
  margin-top: 20px;
}
.importBox input[type="file"] {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  cursor: pointer;
}
.importBox {
  position: relative;
  width: 98px;
  height: 40px;
  top: 2px;
}
.importBox-txt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.importBox-tips {
  font-size: 14px;
  display: inline-block;
  margin-left: 5px;
}
.importBox-tips i {
  display: inline-block;
  margin-left: 5px;
}
.importBox-tips .el-icon-success {
  color: #67c23a;
}
.importBox-tips .el-icon-error {
  color: #f56c6c;
}
.clearBtn [class*="el-icon-"] + span {
  margin-left: 0;
}
</style>
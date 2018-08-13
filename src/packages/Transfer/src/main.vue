<template>
  <el-transfer 
    v-model="model_" 
    :data="transfer.data || data"
    :filterable='transfer.filterable || filterable'
    :filter-method='transfer.filterMethod || filterMethod'
    :filter-placeholder='transfer.filterPlaceholder || filterPlaceholder'
    :target-order='transfer.targetOrder || targetOrder'
    :titles='transfer.titles || titles'
    :button-texts='transfer.buttonTexts || buttonTexts'
    :render-content='transfer.renderContent || renderContent'
    :format='transfer.format || format'
    :props='transfer.props || props'
    :left-default-checked='transfer.leftDefaultChecked || leftDefaultChecked'
    :right-default-checked='transfer.rightDefaultChecked || rightDefaultChecked'
    @left-check-change='leftCheckChange'
    @right-check-change='rightCheckChange'
  >
    <slot name="left-footer" slot="left-footer"></slot>
    <slot name="right-footer" slot="right-footer"></slot>
  </el-transfer>
</template>

<script>
    export default {
      name: 'GlTransfer',
      props: {
        transfer: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        data: {
          type: Array
        },
        filterable: {
          type: Boolean
        },
        filterMethod: {
          type: Function
        },
        filterPlaceholder: {
          type: String
        },
        targetOrder: {
          type: String
        },
        titles: {
          type: Array
        },
        buttonTexts: {
          type: Array
        },
        renderContent: {
          type: Function
        },
        format: {
          type: Object
        },
        props: {
          type: Object
        },
        leftDefaultChecked: {
          type: Array
        },
        rightDefaultChecked: {
          type: Array
        },
        value: {
          type: null
        }
      },
      data() {
        return {
          model_: this.value,
          change_: this.transfer.change === undefined ? this.change === undefined ? _ => null : this.change : this.transfer.change,
          leftCheckChange_: this.transfer.leftCheckChange === undefined ? this.leftCheckChange === undefined ? _ => null : this.leftCheckChange : this.transfer.leftCheckChange,
          rightCheckChange_: this.transfer.rightCheckChange === undefined ? this.rightCheckChange === undefined ? _ => null : this.rightCheckChange : this.transfer.rightCheckChange
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
          this.$emit('blur', val)
          this.$emit('focus', val)
        },
        value(val) {
          this.model_ = val
        }
      },
      methods: {
        rightCheckChange(val) {
          this.$emit('right-check-change', val)
        },
        leftCheckChange(val) {
          this.$emit('left-check-change', val)
        }
      }
    }
</script>
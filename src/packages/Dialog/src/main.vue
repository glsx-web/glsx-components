<template>
    <el-dialog
        :title="dialog.title || title"
        :visible.sync="model_"
        :width='dialog.width || width'
        :fullscreen='dialog.fullscreen || fullscreen'
        :top='dialog.top || top'
        :modal='dialog.modal || modal'
        :modal-append-to-body='dialog.modalAppendToBody || modalAppendToBody'
        :append-to-body='dialog.appendToBody || appendToBody'
        :lock-scroll='dialog.lockScroll || lockScroll'
        :custom-class='dialog.customClass || customClass'
        :close-on-click-modal='dialog.closeOnClickModal || closeOnClickModal'
        :close-on-press-escape='dialog.closeOnPressEscape || closeOnPressEscape'
        :show-close='dialog.showClose || showClose'
        :before-close='dialog.beforeClose || beforeClose'
        :center='dialog.center || center'
        @open='open'
        @close='close'
        @closed='closed'
        >
        <slot></slot>
        <slot name="footer" slot="footer"></slot>
    </el-dialog>
</template>

<script>
    export default {
      name: 'GlDialog',
      props: {
        dialog: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        visible: {
          type: Boolean,
          default: false
        },
        title: {
          type: String
        },
        width: {
          type: String,
          default: '50%'
        },
        fullscreen: {
          type: Boolean,
          default: false
        },
        top: {
          type: String,
          default: '15vh'
        },
        modal: {
          type: Boolean,
          default: true
        },
        modalAppendToBody: {
          type: Boolean,
          default: true
        },
        appendToBody: {
          type: Boolean,
          default: false
        },
        lockScroll: {
          type: Boolean,
          default: true
        },
        customClass: {
          type: String
        },
        closeOnClickModal: {
          type: Boolean,
          default: true
        },
        closeOnPressEscape: {
          type: Boolean,
          default: true
        },
        showClose: {
          type: Boolean,
          default: true
        },
        beforeClose: {
          type: Function
        },
        center: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          model_: this.dialog.visible === undefined ? this.visible === undefined ? false : this.visible : this.dialog.visible
        }
      },
      methods: {
        open(val) {
          this.$emit('open', val)
        },
        close(val) {
          this.$emit('close', val)
        },
        closed(val) {
          this.$emit('closed', val)
        }
      },
      watch: {
        visible(val) {
          this.model_ = val
        },
        model_(val) {
          this.$emit('update:visible', val)
        }
      }
    }
</script>

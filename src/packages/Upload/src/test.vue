<template>
    <el-upload
      :action='upload.action || action'
      :headers='upload.headers || headers'
      :multiple='upload.multiple || multiple'
      :data='upload.data || data'
      :name='upload.name || name'
      :with-credentials='upload.withCredentials || withCredentials'
      :show-file-list='upload.showFileList || showFileList'
      :drag='upload.drag || drag'
      :accept='upload.accept || accept'
      :on-preview='upload.onPreview || onPreview'
      :on-remove='upload.onRemove || onRemove'
      :on-success='upload.onSuccess || onSuccess'
      :on-error='upload.onError || onError'
      :on-progress='upload.onProgress || onProgress'
      :on-change='upload.onChange || onChange'
      :before-upload='upload.beforeUpload || beforeUpload'
      :before-remove='upload.beforeRemove || beforeRemove' 
      :list-type='upload.listType || listType'
      :auto-upload='upload.autoUpload || autoUpload'
      :file-list='upload.fileList || fileList'
      :http-request='upload.httpRequest || httpRequest'
      :disabled='upload.disabled || disabled'
      :limit="upload.limit || limit"
      :on-exceed='upload.onExceed || onExceed'
    >
      <slot></slot>
      <slot name="tip" slot="tip"></slot>
      <slot name="trigger" slot="trigger"></slot>
    </el-upload>
</template>

<script>
    export default {
      name: 'GlUpload',
      props: {
        upload: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        action: {
          type: String,
          default: ''
        },
        headers: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        multiple: {
          type: Boolean
        },
        data: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        name: {
          type: String,
          default: 'file'
        },
        withCredentials: {
          type: Boolean,
          default: false
        },
        showFileList: {
          type: Boolean,
          default: true
        },
        drag: {
          type: Boolean,
          default: false
        },
        accept: {
          type: String
        },
        onPreview: {
          type: Function
        },
        onRemove: {
          type: Function
        },
        onSuccess: {
          type: Function
        },
        onError: {
          type: Function
        },
        onProgress: {
          type: Function
        },
        onChange: {
          type: Function
        },
        beforeUpload: {
          type: Function
        },
        beforeRemove: {
          type: Function
        },
        listType: {
          type: String,
          default: 'text'
        },
        autoUpload: {
          type: Boolean,
          default: true
        },
        fileList: {
          type: Array,
          default: _ => []
        },
        httpRequest: {
          type: Function
        },
        disabled: {
          type: Boolean,
          default: false
        },
        limit: {
          type: Number
        },
        onExceed: {
          type: Function
        }
      }
    }
</script>

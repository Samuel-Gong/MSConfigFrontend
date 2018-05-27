<template>
  <form action="http://localhost:8000/test/uploadFolder" method="post" enctype="multipart/form-data">
    <!-- html5支持选择文件夹上传 -->
    <input type="file" name="folder" multiple webkitdirectory>
    <button type="submit">上传</button>
  </form>
</template>

<script>
  export default {
    name: "UploaderComponent",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style>
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

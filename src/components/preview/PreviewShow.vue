<template>
  <div style="height: 500px; overflow: scroll">
    <pre class="line-numbers line-highlight language-java"><code>{{file.content}}</code></pre>
  </div>
</template>

<script>

  import Prism from "prismjs";

  export default {
    name: "PreviewShow",
    props: ['file'],
    computed: {

    },
    mounted(){
      Prism.highlightAll();
    }
  }
</script>

<style scoped>
  @import "../../assets/css/prism.css";
</style>

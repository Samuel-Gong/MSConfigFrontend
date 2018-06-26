<template>
  <div style="height: 500px; overflow: scroll">
    <pre class="line-numbers line-highlight language-css"><code>{{file.content}}</code></pre>
  </div>
</template>

<script>

  import {Prism} from "../../assets/js/prism";

  export default {
    name: "PreviewShow",
    props: ['file']
  }
</script>

<template>
  <el-button @click="preStep">Prev</el-button>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "PreStepBtn",
    computed: {
      ...mapState({
        active: 'stepsActive'
      })
    },
    methods: {
      // 上一步
      preStep() {
        this.$store.commit("decreStep");
        this.$router.push(
          {path: `/config/${this.active + 1}`}
        )
      }
    }
  }
</script>

<style scoped>

</style>

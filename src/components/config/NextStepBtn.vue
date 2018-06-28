<template>
  <el-button @click="nextStep">Next</el-button>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "NextStepBtn",
    computed: {
      ...mapState({
        active: 'stepsActive'
      })
    },
    methods: {
      // 下一步
      nextStep() {
        this.$store.commit("increStep");
        this.$router.push(
          {path: `/config/${this.active + 1}`}
        )
      }
    }
  }
</script>

<style scoped>

</style>

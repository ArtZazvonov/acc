<template>
  <div>
    <h2>Система обработки заявок</h2>
  </div>
</template>
<script>
export default {
  middleware: ['clientAuth']
}
</script>
<style lang="scss" scoped>
  div{
    display: flex;
    justify-content: center;
  }
</style>

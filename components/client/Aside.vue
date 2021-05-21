<template>
  <el-menu
    router
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-custom"
  >
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span>Аналитика</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">Тикеты</span>
      </template>
      <el-menu-item index="/ticket/list">
        <i class="el-icon-tickets" />
        <span>Список тикетов</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">Сотрудники</span>
      </template>
      <el-menu-item index="/user/list">
        <i class="el-icon-document" />
        <span>Список сотрудников</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-custom{
    height: 100%;
  }
</style>

<template>
  <el-container class="page-layout">
    <el-header><Navigation /></el-header>
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-main><Nuxt /></el-main>
      <button type="button" class="btn-create-ticket" @click.prevent="$router.push('/ticket/create')"><i class="icon-plus-solid"></i></button>
    </el-container>
    <el-footer><Footer /></el-footer>
  </el-container>
</template>

<script>
import Navigation from '@/components/Navigation'
import Aside from '@/components/client/Aside'
import Footer from '@/components/Footer'
export default {
  components: {
    Navigation,
    Footer,
    Aside
  },
  data () {
    return {}
  },
  computed: {
    isError () {
      return this.$store.getters.isError
    }
  },
  watch: {
    isError (val) {
      alert(val.response.data.messege)
    }
  }
}
</script>

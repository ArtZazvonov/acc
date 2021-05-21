<template>
  <el-container class="page-layout">
    <el-header class="header"><Navigation /></el-header>
    <el-container>
      <el-aside><Aside /></el-aside>
      <el-main><Nuxt /></el-main>
    </el-container>
    <el-footer><Footer /></el-footer>
  </el-container>
</template>

<script>
import Navigation from '@/components/Navigation'
import Aside from '@/components/admin/Aside'
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
  },
  mounted () {},
  methods: {}
}
</script>

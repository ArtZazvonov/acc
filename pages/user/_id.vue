<template>
  <v-row cols="12">
    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
      <v-card>
        <v-card-title>
          <div class="profile-header">
            <h3>Ваш профиль</h3>
            <v-avatar size="48">
              <img v-if="localUser.image" :src="'/upload' + localUser.image">
              <img v-else src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
            </v-avatar>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="localUser.lastName" label="Ваша фамилия" />
            <v-text-field v-model="localUser.firstName" label="Ваше имя" />
            <v-text-field v-model="localUser.patronymic" label="Ваше отчество" />
            <v-text-field v-model="localUser.phone" label="Номер телефона" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :loading="loading" @click.prevent="onSubmit">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
      <v-card>
        <v-card-title>Ваша статистика</v-card-title>
        <v-card-text></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const user = await store.dispatch('user/USER_ID', params.id)
    return { user }
  },
  data () {
    return {
      loading: false,
      localUser: {}
    }
  },
  head () {
    return {
      title: `Пользователь | ${this.localUser.fullName}`
    }
  },
  created () {
    this.localUser = this.user[0]
  },
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await this.$store.dispatch('user/UPDATE_USER', this.localUser)
          this.loading = false
        } catch (error) {
          this.loading = false
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile-header{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>

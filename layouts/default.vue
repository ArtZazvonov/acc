<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn icon x-large>
        <v-avatar size="48" @click.stop="drawerRight = !drawerRight">
          <img v-if="isUserAuth.image" :src="'/upload' + isUserAuth.image">
          <img v-else src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in menuItems">
          <v-list-item v-if="!item.children" :key="item.text" link :to="item.path">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-group v-else :key="item.text" v-model="item.model" prepend-icon="" :append-icon="item.model ? item.icon : item['icon-alt']">
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.path" class="pl-6">
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawerRight" fixed right temporary>
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img v-if="isUserAuth.image" :src="'/upload' + isUserAuth.image">
            <img v-else src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ isUserAuth.firstName + ' ' + isUserAuth.lastName }}</v-list-item-title>
            <v-list-item-subtitle>{{ isUserAuth.role === 0 ? 'Администратор' : "Менеджер" }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list>
        <v-list dense>
          <v-list-item link :to="`/user/${isUserAuth._id}`">
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="logOut">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Выход</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app color="blue darken-3" dark>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-account-card-details-outline" placeholder="Company"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      drawerRight: false,
      menuItems: [
        { icon: 'mdi-google-analytics', text: 'Статистика', path: '/' },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Тикеты',
          model: false,
          children: [
            { icon: 'mdi-format-list-text', text: 'Список тикетов', path: '/ticket/list' },
            { icon: 'mdi-playlist-plus', text: 'Открыть тикет', path: '/ticket/create' }
          ]
        }
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'Сотрудники',
        //   model: false,
        //   children: [
        //     { icon: 'mdi-account-group-outline', text: 'Список сотрудников', path: '/user/list' }
        //   ]
        // }
      ]
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    },
    isUserAuth () {
      return this.$store.getters['auth/getUser']
    },
    isError () {
      return this.$store.getters.isError
    }
  },
  watch: {
    isError (val) {
      alert(val.response.data.messege)
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth/LOGOUT')
    }
  }
}
</script>

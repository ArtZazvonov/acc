<template>
  <v-card>
    <v-card-title>
      <h3>Список тикетов</h3>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск тикета"
        single-line
        hide-details
        class="pt-0"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="ticketList" :loading="loading" :search="search" expanded.sync single-expand show-expand item-key="_id">
        <template #[`item.date`]="{ item }">
          {{ item.date | date }}
        </template>
        <template #[`item.status`]="{ item }">
          <v-select v-model="item.status" :items="status" item-text="name" item-value="val" dense hide-details @change="onChangeTicket(item)" />
        </template>
        <template #[`item.client`]="{ item }">
          {{ item.client }}
        </template>
        <template #[`item.addrres`]="{ item }">
          {{ item }}
        </template>
        <template #[`item.phone`]="{ item }">
          <a :href="`tel:+` + item.phone">{{ item.phone }}</a>
        </template>
        <template #[`item.executor`]="{ item }">
          <v-select v-model="item.executor" :items="executorList" :item-text="item => item.firstName +' '+ item.lastName" item-value="_id" dense hide-details @change="onChangeTicket(item)" />
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="buttons-groupe">
            <v-btn color="primary" elevation="0" fab x-small dark @click.prevent="commentView(item)"><v-icon>mdi-comment-eye</v-icon></v-btn>
            <v-btn class="ml-1" color="primary" elevation="0" fab x-small dark @click.prevent="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>
          </div>
        </template>
        <template #expanded-item="{ item }">
          <td :colspan="headers.length" class="py-6 px-4">
            <p class="mb-0">{{ item.description }}</p>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="dialog.active" max-width="800px">
      <v-card v-if="dialog.type === 'ticket'">
        <v-card-title>
          <span class="text-h5">Редактирование тикета</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ticketEditForm.client" label="Клиент" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ticketEditForm.address" label="Адрес" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ticketEditForm.phone" label="Телефон" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ticketEditForm.description" label="Описание" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click.prevent="close">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click.prevent="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="dialog.type === 'comments'">
        <v-card-title>
          <span class="text-h5">Комментарии</span>
        </v-card-title>
        <v-card-text>
          <template v-if="ticketEditForm.comments.length > 0">
            <v-card v-for="(comment, index) in ticketEditForm.comments" :key="index" class="comment py-4 px-2" elevation="3">
              <div class="comment-header">
                <p><v-icon>mdi-calendar-clock</v-icon><span>{{ comment.commentDate | date }}</span></p>
                <p>
                  <span v-if="comment.commentAuthor.familyInitials">{{ comment.commentAuthor.familyInitials }}</span>
                  <span v-else-if="comment.commentAuthor.fullName">{{ comment.commentAuthor.fullName }}</span>
                  <span v-else>{{ comment.commentAuthor.login }}</span>
                  <el-avatar v-if="comment.commentAuthor.image" :size="25" :src="'/upload' + comment.commentAuthor.image" />
                  <v-icon v-else>mdi-account-circle-outline</v-icon>
                </p>
              </div>
              <div class="comment-text">
                <p class="mb-0">{{ comment.commentText }}</p>
              </div>
            </v-card>
          </template>
          <p v-else>Комментариев пока нет</p>
          <h3 class="mt-6 mb-2">Добавить новый комментарии</h3>
          <v-form ref="form">
            <v-textarea v-model="newComment.text" solo prepend-inner-icon="mdi-comment" rows="2" />
            <v-btn class="mr-4" color="primary" type="submit" @click.prevent="onCommentSubmit(ticketEditForm._id)">Отправить</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn color="pink" dark fab fixed right bottom nuxt to="/ticket/create"><v-icon>mdi-plus</v-icon></v-btn>
  </v-card>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  async asyncData ({ store }) {
    try {
      const ticketList = await store.dispatch('ticket/ticketList')
      const executorList = await store.dispatch('user/executorList')
      return { ticketList, executorList }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      search: '',
      loading: false,
      editedIndex: null,
      selectedExecutor: {},
      ticketEditForm: {},
      dialog: {
        type: '',
        active: false
      },
      headers: [
        { text: 'Дата', value: 'date', align: 'start', width: '80px' },
        { text: 'Статус', value: 'status', align: 'start', width: '150px' },
        { text: 'Клиент', value: 'client', align: 'start', width: '25%' },
        { text: 'Адрес', value: 'address', align: 'start', width: '25%' },
        { text: 'Телефон', value: 'phone', align: 'start', width: '20%' },
        { text: 'Исполнитель', value: 'executor', align: 'start', width: '100px' },
        { text: 'Действие', value: 'actions', align: 'start', sortable: false, width: '100px' },
        { text: '', value: 'data-table-expand' }
      ],
      newComment: {
        text: ''
      }
    }
  },
  computed: {
    status () {
      return this.$store.getters.status
    },
    authUser () {
      return this.$store.getters['auth/getUser']
    }
  },
  methods: {
    editItem (ticket) {
      this.editedIndex = this.ticketList.indexOf(ticket)
      this.ticketEditForm = Object.assign({}, ticket)
      this.dialog.type = 'ticket'
      this.dialog.active = true
    },
    commentView (ticket) {
      this.editedIndex = this.ticketList.indexOf(ticket)
      this.ticketEditForm = Object.assign({}, ticket)
      this.dialog.type = 'comments'
      this.dialog.active = true
    },
    close () {
      this.editedIndex = null
      this.ticketEditForm = {}
      this.dialog.type = ''
      this.dialog.active = false
    },
    save () {
      Object.assign(this.ticketList[this.editedIndex], this.ticketEditForm)
      this.onChangeTicket(this.ticketEditForm)
      this.close()
    },
    onChangeTicket (ticket) {
      this.$store.dispatch('ticket/update', ticket)
    },
    async onCommentSubmit (ticketId) {
      if (this.$refs.form.validate()) {
        const newComment = {
          ticketID: ticketId,
          commentAuthor: this.authUser,
          commentText: this.newComment.text
        }
        try {
          const savedComments = await this.$store.dispatch('ticket/createComment', newComment)
          this.ticketList[this.editedIndex].comments.push(savedComments)
          this.newComment.text = ''
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  table tbody td {
    font-size: 12px !important;
  }
  .v-select__selection{
    font-size: 12px !important;
  }
  .buttons-groupe{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment{
    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      p{
        margin-bottom: 0;
        img{
          vertical-align: middle;
        }
        >span{
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      p+p{
        margin-left: 15px;
      }
    }
    &+.comment{
      margin-top: 10px;
    }
  }
</style>

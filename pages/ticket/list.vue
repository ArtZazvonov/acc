<template>
  <div>
    <el-row type="flex">
      <el-col><h2 class="page-title">Список тикетов</h2></el-col>
      <el-col><el-input v-model="search" placeholder="Поиск по клиенту" /></el-col>
    </el-row>
    <el-table :data="ticketList.filter(data => !search || data.client.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" max-height="350">
      <el-table-column fixed prop="description" type="expand">
        <template slot-scope="props">
          <p><strong>Описаие:</strong> {{ props.row.description }}</p>
          <p><strong>Комментарии:</strong> {{ props.row.commens }}</p>
          <h3>Оставить свой комментарий:</h3>
          <el-form ref="form" :model="newComment" :rules="rules">
            <el-form-item label="Текст комментария" prop="comment">
              <el-input v-model="newComment.text" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click.prevent="onSubmit()">Добавитьь комментарий</el-button>
            </el-form-item>
          </el-form>
          <!-- <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit(ticket._id)">
            <ValidationProvider v-slot="{ errors }" tag="div">
              <textarea v-model="newComment.text" type="text" rows="5" />
              <span class="validate-error">{{ errors[0] }}</span>
            </ValidationProvider>
            <button type="submit" class="btn">Добавитьь комментарий</button>
          </ValidationObserver> -->
        </template>
      </el-table-column>
      <el-table-column fixed prop="date" sortable label="Дата" width="160" />
      <el-table-column prop="status" sortable label="Статус" width="200">
        <template slot-scope="{ row }">
          <el-select v-model="row.status" placeholder="Select" @change="onChangeTicketStatus(row)">
            <el-option v-for="item in status" :key="item.value" :label="item.name" :value="item.val" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="client" sortable label="Клиент" />
      <el-table-column prop="address" label="Адрес" />
      <el-table-column prop="phone" label="Телефон" />
      <el-table-column fixed="right">
        <template slot-scope="{ row }">
          <el-button type="primary" icon="el-icon-edit" circle @click.native.prevent="ticketEdit(row._id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  async asyncData ({ store }) {
    const ticketList = await store.dispatch('ticket/ticketList')
    return { ticketList }
  },
  data () {
    return {
      search: '',
      loading: false,
      dialogTableVisible: false,
      status: [
        { name: 'Новый', val: 0 },
        { name: 'В работе', val: 1 },
        { name: 'Нужен выезд', val: 2 },
        { name: 'Ожидает действия клинта', val: 3 },
        { name: 'Выполнен', val: 4 },
        { name: 'Отложен', val: 5 },
        { name: 'Закрыт', val: 6 }
      ],
      newComment: {
        text: ''
      },
      rules: {
        comment: [
          { min: 10, messege: 'Минимум 10 символов', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ticketMore (e) {
      e.target.closest('.ticket').querySelector('.ticket-desc').classList.toggle('ticket-desc__open')
    },
    ticketEdit (id) {
      this.$router.push({ path: `/ticket/${id}` }) // -> /ticket/id
    },
    onChangeTicketStatus (ticket) {
      console.log(ticket)
      // this.$store.dispatch('ticket/update', ticket)
    },
    async onSubmit (id) {
      const newComment = {
        text: this.newComment.text,
        authorID: this.$store.getters['auth/getUser'].userId,
        ticketID: id
      }
      try {
        await this.$store.dispatch('ticket/createComment', newComment)
        // this.$router.push('/ticket/list')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss"></style>

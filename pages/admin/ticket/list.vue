<template>
  <div>
    <h3>Список тикетов</h3>
    <el-table :data="ticketList" :default-sort="{prop: 'date'}" style="width: 100%" max-height="250">
      <el-table-column fixed prop="description" type="expand">
        <template slot-scope="props">
          <p><strong>Описаие:</strong> {{ props.row.description }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed prop="_id" label="id" /> -->
      <el-table-column fixed prop="date" sortable label="Дата" width="160" />
      <el-table-column prop="status" sortable label="Статус" width="100" />
      <el-table-column prop="client" sortable label="Клиент" />
      <el-table-column prop="address" label="Адрес" />
      <el-table-column prop="phone" label="Телефон" />
      <el-table-column prop="ticketList" fixed="right" label="Действие">
        <template slot-scope="{ row }">
          <el-button type="primary" icon="el-icon-edit" circle @click.native.prevent="ticketEdit(row._id)" />
          <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="ticketDelete(row._id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData ({ store }) {
    const ticketList = await store.dispatch('ticket/ticketList')
    return { ticketList }
  },
  data () {
    return {
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
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }]
    }
  },
  methods: {
    ticketEdit (id) {
      this.$router.push({ path: `/ticket/${id}` })
    },
    async ticketDelete (id) {
      try {
        await this.$confirm('Удалить тикет?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$store.dispatch('ticket/remove', id)
        this.ticketList = this.ticketList.filter(t => t._id !== id)
        this.$message.success('Тикет удален')
      } catch (error) {
        this.$message.info('Тикет не удален')
      }
    }
  }
}
</script>

<style lang="scss"></style>

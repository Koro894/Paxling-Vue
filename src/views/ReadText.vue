<script>
import axios from 'axios';

export default {
  data() {
    return {
      fetchedItems: [],  // Заголовки/названия
      text: [],          // Тексты на основном языке
      en_text: [],       // Тексты на английском
      user: []           // Тексты пользователя
    };
  },
  computed: {
    maxItems() {
      // Вычисляем минимальное количество элементов среди всех массивов,
      // чтобы избежать ошибок индексации
      return Math.min(
        this.user.length,
        this.fetchedItems.length,
        this.text.length,
        this.en_text.length,
      );
    }
  },
  methods: {
    async Text_User() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_user');
        this.user = response.data;
        console.log(this.user);
      } catch (error) {
        console.error('Ошибка загрузки user текстов:', error);
      }
    },
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_title');
        this.fetchedItems = response.data;
        console.log(this.fetchedItems);
      } catch (error) {
        console.error('Ошибка загрузки заголовков:', error);
      }
    },
    async Text() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_before');
        this.text = response.data;
        console.log(this.text);
      } catch (error) {
        console.error('Ошибка загрузки текстов:', error);
      }
    },
    async EN_Text() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_en');
        this.en_text = response.data;
        console.log(this.en_text);
      } catch (error) {
        console.error('Ошибка загрузки английских текстов:', error);
      }
    }
  },
  mounted() {
    // Загружаем все данные параллельно
    this.Text_User();
    this.fetchItems();
    this.Text();
    this.EN_Text();
  }
};
</script>

<template>  
  <div class="table_bok">
    <ul>
      <a ><li>Разделы</li></a>
      <a ><li>Игры</li></a>
      <a><li>Развлечения</li></a>
      <a><li>Хобби</li></a>
      <a ><li>Научные статьи</li></a>
    </ul>
  </div>

  <!-- Показываем первый заголовок отдельно -->
  <h1 v-if="fetchedItems.length">{{ fetchedItems[0] }}</h1>

  <div class="all_text">
    <div v-for="index in maxItems * 4" :key="index">
      <template v-if="index % 4 === 0">
        <h1>{{ fetchedItems[Math.floor(index / 4)] }}</h1>
      </template>
      <template v-else-if="index % 4 === 1">
        <p>{{ text[Math.floor(index / 4)] }}</p>
      </template>
      <template v-else-if="index % 4 === 2">
        <h1>Текст на английском <br></h1>
        <p>{{ en_text[Math.floor(index / 4)] }}</p>
      </template>
      <template v-else>
        <h1>Автор: {{ user[Math.floor(index / 4)] }} <br><br><br></h1>
      </template>
    </div>
  </div>
</template>

<style scoped>
  @import './function/css_function/Table/Table.css';
</style>

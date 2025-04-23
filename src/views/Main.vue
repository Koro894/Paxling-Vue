<template>  
  <div class="table_bok">
    <ul>
      <a><li>О чём этот сайт</li></a>
      <a><li>Чем сайт может помочь</li></a>
    </ul>
  </div>
  <div class="all_text">
    <h1 style="user-select: none;"><br>Paxling</h1>
    <h1><br>О чём этот сайт?</h1>
    <p>
      Этот сайт предназначен для выкладывания своих статей, общения и обучения.<br>
    </p>
    <p class="erro">Сайт находится в разработке и возможности сайта ограничены.<br>Возможны баги и аномалии. Также API и авторизация уже делается. Сайт не предназначен для мобильных устройств. </p>
    <p data-descr="Это подсказка">подсказка, наведите на неё</p>
    <p>Проект включает в себя API Яндекс Переводчика, GPT Lite и FastAPI</p>
    <h1><br/></h1>
    <h1>Новые статьи Пакслинг.рф</h1>

    <h1>{{fetchedItems[0]}}</h1>
    <div v-for="index in maxItems * 3" :key="index">
      <template v-if="index % 3 === 0">
        <h1>{{ fetchedItems[Math.floor(index / 3)] }}</h1>
      </template>
      <template v-else-if="index % 3 === 1">
        <p>{{ text[Math.floor(index / 3)] }}</p>
      </template>
      <template v-else>
        <p>{{ en_text[Math.floor(index / 3)] }}</p>
      </template>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fetchedItems: [], 
      text: [],         
      en_text: []       
    };
  },
  computed: {
    maxItems() {
      return Math.min(this.fetchedItems.length, this.text.length, this.en_text.length);
    }
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_title');
        this.fetchedItems = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async Text() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_before');
        this.text = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async EN_Text() {
      try {
        const response = await axios.get('http://localhost:8010/text/text_get_en');
        this.en_text = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchItems();
    this.Text();
    this.EN_Text();
  }
};
</script>

<style scoped>
  @import "./function/css_function/Table/Table.css"
</style>

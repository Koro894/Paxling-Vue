<template>
  <div class="table_bok-top">
    <ul>
      <a><h1> Выберите язык который хотите ввести для перевода</h1></a>
      <a><li>Авто (по умолчанию)</li></a>
      <a ><h2>Скоро появятся...</h2></a>
      <a><li>Русский</li></a>
      <a><li>Английский</li></a>
      <a ><li>Немецкий</li></a>
      <a ><li>Французкий</li></a>
      <a ><li>Китайский</li></a>
      <a ><li>Японский</li></a>
    </ul>
  </div>
  <div class="table_bok-bottom">
    <ul>
      <a><h1>Выберите язык, на который хотите перевести</h1></a>
      <a @click="targetLang='en'" ><li>Английский</li></a>
      <a @click="targetLang='ru'"><li>Русский</li></a>
      <a @click="targetLang='ja'"><li>Японский</li></a>
      <a @click="targetLang='de'"><li>Немецкий</li></a>
      <a @click="targetLang='fr'"><li >Французкий</li></a>
      <a @click="targetLang='zh'"><li >Китайский</li></a>
    </ul>
  </div>
  <div class="all_text">
    <div class="menu_trans">
      <textarea class="left-menu_trans" v-model="leftPerevod" placeholder="Введите текст, который хотите перевести ..."></textarea>
      <textarea class="right-menu_trans" v-model="rightPerevod" placeholder="   Вывод перевода..."></textarea>
      <button class="butt_perevod" @click="translateText">Перевести</button>
    </div>
    <div class="temper_text_01">
      <h1 style="text-align: start;">История</h1>
      <ul>
        <p style="margin-left: 5%;" v-for="(item, index) in historySlove_left" :key="item"> {{ item }} - {{ historySlove_right[index] || 'Отсутствует слово' }} </p>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const leftPerevod = ref('');
    const rightPerevod = ref('');
    const historySlove_left = ref([]);
    const historySlove_right = ref([]);
    const targetLang = ref('en');

    const translateText = async () => {
      try {
        const response = await axios.post('http://localhost:8010/text/text_translater', {
          before_text: [leftPerevod.value],
          language: targetLang.value
        });

        if (response.status === 200) {
          rightPerevod.value = response.data;
          historySlove_left.value.push(leftPerevod.value);
          historySlove_right.value.push(rightPerevod.value);
        } else {
          console.error('Ошибка перевода:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error);
      }
    };

    return {
      leftPerevod,
      rightPerevod,
      historySlove_left,
      historySlove_right,
      translateText,
      targetLang
    };
  }
};
</script>

<style scoped>
  @import "css_views/Tranclater/main_Tr.css";
  @import "css_views/Tranclater/table_top.css";
  @import "css_views/Tranclater/table_bottom.css";
</style>

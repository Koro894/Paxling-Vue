
<template>
  
  <div class="table_bok_up">

  </div>

  <div class="table_bok">
    <ul>
      <a><button title="Жирный текст"><img src="../assets/Redaktor_Text/bold_text.svg"></img></button></a>
      <a><button title="Курсив"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Подчёркнутый"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Выравнивание по левому краю"><img src="../assets/Redaktor_Text/bold_text.svg  "></img></button></a>
      <a><button title="Выравнивание по центру"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Выравнивание по правому краю"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Выравнивание по ширине"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Список (Точки)"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Список (Нумерация)"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
      <a><button title="Список (Галочки)"><img src="../assets/Redaktor_Text/bold_text.svg "></img></button></a>
    </ul>
  </div>
  <div class=".contain">
    <textarea class="out_document_one" v-model="Title_Area" placeholder="Название статьи"></textarea>
    <textarea class="out_document" v-model="Text_Area" placeholder="Содержание"></textarea>
  </div>
  <div class="opuble">
    <select v-model="selected">
      <option disabled value=""> Куда опубликовать?</option>
      <option >История</option>
      <option >Тексты для чтения</option>
      <option >Грамматика</option>
    </select>
    <button @click="upubluc_text">Опубликовать</button>
  </div>
</template>
      

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';

const Text_Area = ref('');
const Title_Area = ref('');
const user = ref('');
const _ban = ref();
const _right_write_comments = ref(); 
const selected = ref('');
const token = ref(localStorage.getItem('jwtToken'));
console.log(token);


onMounted(() => {
  auth_user()
});


const auth_user = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8010/users/auth_jwt', {
        token: token.value,
    });

    if (response.status === 200) {
      user.value = response.data.user;
      // const _ban = response.data._ban;
      // const _right_write_comments = response.data._right_write_comments;

    }
  } catch (error) {
    console.log("Получение токена не удалась :(")
  }
};


const upubluc_text = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8010/text/text_setup', {
      user: user.value,
      before_text: Text_Area.value,
      title_text: Title_Area.value
    });

    if (response.status === 200) {
      console.log('Публикация статьи успешна')
      router.push('/');

    }
  } catch (error) {
    console.error("Ошибка, опубликация была завершена неуспешно")
  }
};
</script>

<style scoped>
@import './css_views/Redaktor_Text/Redaktor_Text.css'
</style>



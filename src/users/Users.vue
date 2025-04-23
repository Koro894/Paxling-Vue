<template>
    <div class="user_id_xolst">
      <h1 class="info_iser_h1">Информация о пользователе</h1>
      <a class="user_logo"><img src="./user.png" alt="Пользователь" /></a>
      <h1 class="pod_logo_user">{{ user }}</h1>
      <h2 class="name_user">Имя пользователя: {{ user }}</h2>
      <h2 class="name_user">Уровень пользователя: {{ aura }}</h2>
      <h2 class="name_user">Дата создания аккаунта: {{ format_Date}}</h2>
      <h2 class="name_user">Описание:</h2>
      <textarea readonly class="descript_user">{{ description }}</textarea>
      <button class="public_tem" @click="$router.push({ name: 'Redaktor_Text'})">Сделать публикацию</button>
      <button class="exit_butt" @click="exit_user">Выйти из аккаунта</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { computed } from 'vue';
  import moment from 'moment';

  const  _is_redovui	= ref();
  const  _is_researcher	= ref();
  const  _is_alchemist	= ref();
  const  _is_scientist	= ref();
  const  _is_wandering_scientist = ref();	
  const  _is_philosopher	= ref();
  const  _is_doctor_of_sciences =	ref();
  const  _is_wanderer_IT =	ref();
  const  _is_doctor_IT	= ref();
  const  _is_shadow_site = ref();


  const user = ref('...');
  const aura = ref('...');
  const createdAt = ref('');
  const timeOnSite = ref('...');
  const token = ref(localStorage.getItem('jwtToken'));
  const router = useRouter();
  const description = ref('');

  function exit_user() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('created_at');
    token.value = null;
    router.push('/');
  }

  const auth_user = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8010/users/auth_jwt', {
        token: token.value,
      });
  
      if (response.status === 200) {
        console.log(response.data);
        user.value = response.data.user;
        createdAt.value = response.data.created_at;
        _is_redovui.value = response.data._is_redovui;
        _is_researcher.value	= response.data._is_researcher;
        _is_alchemist.value	= response.data._is_alchemist;
        _is_scientist.value	= response.data._is_scientist;
        _is_wandering_scientist.value	= response.data._is_wandering_scientist;
        _is_philosopher.value	= response.data._is_philosopher;
        _is_doctor_of_sciences.value =	response.data._is_doctor_of_sciences;
        _is_wanderer_IT.value	= response.data._is_wanderer_IT
        _is_doctor_IT.value	= response.data._is_doctor_IT;
        _is_shadow_site.value	= response.data._is_shadow_site;
        description.value = response.data.description;
        localStorage.setItem('user', user.value);
        localStorage.setItem('created_at', createdAt);

      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };
const format_Date = computed(() => {
return createdAt.value ? moment(createdAt.value).format('LL') : 'Дата не определена';
});
  
  onMounted(() => {
    if (token.value) {
      auth_user();
    } else {
      console.warn('Токен не найден');
    }
  });
  </script>
  
  <style scoped>
  @import "./Users_passive.css";
  </style>

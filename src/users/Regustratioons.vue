<template>
    <div class="user_xolst">
        <h1 class="info_iser_h1">Регистрация</h1>
        <a class="user_logo"><img src="./user.png" alt="Пользователь" /></a>
        <h2 class="name_user">Введите логин : </h2>
        <input type="text" v-model="user_name" class="inp_rega" placeholder="Введите логин..."/>
        <h3 v-if="user_name.length <= 5">Не менее 5 символов</h3>
        <h3 v-else-if="user_name.length >= 5 && user_name.length <= 100">Не более 100 символов</h3>
        <h3 v-else-if="user_name.length >= 100" :enabled="is_proverk=true">Вы привысили 100 символов!!!</h3>
        <h2 class="name_user">Введите пароль : </h2>
        <h2 class="name_user" style="color: #d11818; font-size: 20px;">Предупреждение. Пожайлуста, придумайте для этого сайта новый <br> пароль, так как на этом сайте незащищённый протокол "http://" <br> и недобросовестные люди могут у вас украсть пароль. <br> На других же сайтах протокол "htpps://" - он более защищённый и современный.</h2>
        <input type="password" v-model="user_password" class="inp_rega" placeholder="Введите пароль..."/>
        <h3 v-if="user_password.length <= 5">Не менее 5 символов</h3>
        <h3 v-else-if="user_password.length >= 5 && user_password.length <= 100">Не более 100 символов</h3>
        <h2 class="name_user" >Введите своё описание (необязательно) : </h2>
        <textarea type="text" v-model="user_descript" class="inp_opusan" placeholder="Введите свое описание, ограничение 2000 символов! ..."></textarea>
        <h4 v-if="user_descript.length <= 2000">{{ user_descript.length }}/2000</h4>
        <h2>Вставьте своё изображение <br>(сейчас такая функция недоступна,<br> даже не пытайтесь этого сделать    😑   )</h2>
        <input type="file" class="get_image" accept="image/*" name="file"/>
        <button class="public_user" @click="reustor_user">Зарегистрироваться</button>
        <h2>{{ _Auth }}</h2>

    </div>
</template>

<style scoped>
@import "./regustr.css";
</style>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Данные формы
const is_proverk = ref(false);
const _Error = ref('');
const user_name = ref('');
const user_password = ref('');
const user_descript = ref('');
const _Auth = ref('');
const Bool_Auth = ref(false);



// Регистрация
const reustor_user = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8010/users/sign_regustrat', {
      user: user_name.value,
      password: user_password.value,
      description: user_descript.value
    });

    if (response.status === 200) {
      const token = response.data.token;
      const id_ = response.data.id;
      console.log(token);
      console.log(id_);
      
      localStorage.setItem('jwtToken', token);
      _Auth.value = 'Регистрация успешна!';
      Bool_Auth.value = true;
      
      router.push(`/user/${id_}`);
    }
  } catch (error) {
    _Auth.value = error.response?.data?.message || 'Ошибка регистрации';
    Bool_Auth.value = false;
  }
};
</script>
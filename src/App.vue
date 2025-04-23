<template>
  <header class="button-container">
    <router-link to="/"><img src="./assets/logo.ico" class="head_img"></router-link>
    <strong><router-link to="/">Paxling</router-link></strong>
    <router-link to="/translat"><button>Переводчик</button></router-link>
    <router-link to="/reade"><button>Тексты для чтения</button></router-link>
    <router-link to="/history"><button>История</button></router-link>
    <RouterLink to="/grammar"><button>Грамматика</button></RouterLink>
    <RouterLink><button id="show-modal" @click="ochered">Личный кабинет</button></RouterLink>
  </header>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"><h3>Авторизация</h3></slot>
          </div>

          <div class="modal-body">
            <slot name="body"><input type="text" placeholder="Никнейм" v-model="userName" class="inp_varifu"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <input type="password" placeholder="Пароль" v-model="userPass" class="inp_varifu">
              <button
                class="modal-default-button"
                @click="author_user"

              >Войти</button>
              <button class="modal-default-button_avtor" @click="regustrac">Зарегистрироваться</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  <router-view>
  </router-view>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const Comp_perexod_slide = false;
const showModal = ref(false);
const userName = ref('');
const userPass = ref('');
const Bool_Auth = ref(false);
const _Auth = ref('');
const id_ = ref('');

function regustrac(){
  showModal.value=false;
  router.push({path: '/regustr'});
}

const ochered = async () => {
  const token = localStorage.getItem('jwtToken');
  if (token && token.length !== 0) {
    await before_auth_user(token);
  } else {
    showModal.value = true;
  }
}

const before_auth_user = async (token) => {
  try {
    const response = await axios.post('http://127.0.0.1:8010/users/auth_jwt', {
      token: token,
    });
    if (response.status === 200 && response.data.id) {
      id_.value = response.data.id;
      showModal.value = false;
      router.push(`/user/${id_.value}`);
    }
  } catch (error) {
    localStorage.removeItem('jwtToken');
    console.error('Ошибка авторизации:', error);
    showModal.value = true;
  }
}


async function author_user(){
  try {
    const response = await axios.post('http://127.0.0.1:8010/users/auth_user', {
      user: userName.value,
      password: userPass.value
    });
    const token = response.data.exp;
    id_.value = response.data.id;
    localStorage.setItem('jwtToken', token);
    _Auth.value = 'Авторизация успешна';
    Bool_Auth.value = true;
    showModal.value = false; // Закрываем модальное окно
    router.push(`/user/${id_.value}`); // Переход на страницу пользователя
  } catch (error) {
    _Auth.value = error;
    Bool_Auth.value = false;
  }
}

</script>

<style>
@import "./views/css_views/Main_views/Main_views.css";
@import './views/function/css_function/Modal/Modal.css';
</style>

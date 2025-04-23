<script setup>

const props = defineProps({
  show: Boolean
})
</script>
<script>
  export default {
    data() {
      return {
        userName: '',
        userPass: '',
        user: [],
      }
    },
    methods: {
      sendData() {
        this.user.push({
          name: this.userName,
          pass: this.userPass,
        })
        this.userPass = '';
        this.userName = '';
      },

    }
  }
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"><h3>Авторизация</h3></slot>
        </div>
        
        <div class="modal-body">
          <slot name="body"><input type="text" placeholder="Никнейм" v-model="userName"></slot>
          <p>{{ userName }}</p>
        </div>
        
        <div class="modal-footer">
          <slot name="footer">
            <input type="password" placeholder="Пароль" v-model="userPass">
            <p>{{ userPass }}</p>
            <button
            class="modal-default-button"
              @click="$emit('close')"
              >OK</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </template>
<style scoped>
  @import './css_function/Modal/Modal.css';
</style>
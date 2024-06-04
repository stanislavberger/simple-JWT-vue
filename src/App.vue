<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'));
  if (tokens) {
    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
    authStore.userInfo.expiresIn = tokens.expiresIn;
  }
  console.log(authStore.userInfo)
}

checkUser();

const logout = () => {
    authStore.logout()
    localStorage.removeItem('userTokens')
    router.push('/signin')
  }

</script>

<template>
  <div class="menu">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/signin" v-if="!token">Login</RouterLink>
    <RouterLink to="/account" v-if="token">Аккаунт</RouterLink>
    <RouterLink to="/signin" v-if="token" @click.prevent="logout">Выйти</RouterLink>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: auto;
}
</style>

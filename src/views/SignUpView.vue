<script setup>
import { ref } from 'vue';

import Loader from '../components/Loader.vue'

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';
import Message from 'primevue/message';


const authStore = useAuthStore();

const email = ref();
const password = ref();

const signup = async () => {
    await authStore.signup({email: email.value, password: password.value})
}

</script>

<template>
<h2>Зарегистрироваться</h2>
<form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
        <InputText type="email" v-model="email" placeholder="Введите Email"/>
    </div>
    <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
            <i class="pi pi-at"></i>
        </span>
        <InputText type="password" v-model="password" placeholder="Введите пароль"/>
    </div>
    <Loader v-if="authStore.loader"/>
    <div v-else class="flex flex-column gap-3">
        <Button label="Зарегистрироваться" @click="signup" />
        <span>Уже зарегестрированы? <router-link to="/signin">Войдите в личный кабинет</router-link></span>
    </div>

</form>

</template>
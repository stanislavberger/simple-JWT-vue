<script setup>
import { ref } from 'vue';

import Loader from '../components/Loader.vue'

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';
import Message from 'primevue/message';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();

const signin = async () => {
    await authStore.auth({email: email.value, password: password.value}, 'signin')
    router.push('/account')
}

</script>

<template>
<h2>Войти в личный кабинет</h2>
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
        <Button label="Войти" @click="signin" />
        <span>Еще не зарегестрированы? <router-link to="/signup">Зарегистрироваться в один клик</router-link></span>
    </div>

</form>

</template>
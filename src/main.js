import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.css'
import { initializeApp } from "firebase/app";

import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyCX3BLdPNLbV7l_QJOEbKZlbA8zY5oncpM",
    authDomain: "vue-jwt-e030f.firebaseapp.com",
    projectId: "vue-jwt-e030f",
    storageBucket: "vue-jwt-e030f.appspot.com",
    messagingSenderId: "181650311904",
    appId: "1:181650311904:web:2af14ef6c0496af9f1de85"
  }

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue);

app.use(createPinia())
app.use(router)

app.mount('#app')

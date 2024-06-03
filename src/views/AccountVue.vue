<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import Loader from '@/components/Loader.vue';
import Card from 'primevue/card';

const items = ref('');
const showLoader = ref(false);

const authStore = useAuthStore();

const getAllArtworks = async () => {
    showLoader.value = true;

    try{
        const response = await axios.get(`https://vue-jwt-e030f-default-rtdb.europe-west1.firebasedatabase.app/items.json`)
        items.value = response.data;
    } catch (err) {
        console.error(err.response);
    } finally {
        showLoader.value = false;
    }
}

onMounted (async () => {
    await getAllArtworks();
})

</script>

<template>
    <h2>Список картин</h2>
    <Loader v-if="showLoader"/>
   <Card v-for="(item, i) in items" :key="i">
        <template #title>{{ item.title }}</template>
        <template #author>{{ item.author }}</template>
   </Card>
</template>
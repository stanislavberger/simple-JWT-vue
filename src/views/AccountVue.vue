<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import Loader from '@/components/Loader.vue';
import Card from 'primevue/card';

const artworks = ref('');
const showLoader = ref(false);

const authStore = useAuthStore();

const getAllArtworks = async () => {
    showLoader.value = true;

    try{
        const response = await axios.get(`https://vue-jwt-e030f-default-rtdb.europe-west1.firebasedatabase.app/artists.json?auth=${authStore.userInfo.token}`)
        artwork.value = response.data
    } catch (err) {
        console.error(err.response);
    }
}

onMounted (async () => await getAllArtworks());

</script>

<template>
    <h2>Список картин</h2>
    <Loader v-if="showLoader"/>
   <Card v-for="(artwork, i) in artworks" :key="i">
        <template #title>{{ artwork.name }}</template>
    
   </Card>
</template>
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
const apiKey = 'AIzaSyCX3BLdPNLbV7l_QJOEbKZlbA8zY5oncpM'

export const useAuthStore = defineStore('auth', () => {

  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  });

  const error = ref('');

  const loader = ref(false);

  const signup = async (payload) => {

    error.value = '';
    loader.value = true;

    try{
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      loader.value = false;
      console.log(response.data)
    }
    catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email с таким адресом уже существует'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Недостаточно прав для действия'
          break;
      }
      loader.value = false;
    }
  }

  return { signup, userInfo, error, loader }
})

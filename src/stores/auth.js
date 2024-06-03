import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

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

  const auth = async (payload, type) => {
    const stringURL = type === 'signup' ? 'signUp': 'signInWithPassword';
    error.value = '';
    loader.value = true;

    try{
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringURL}?key=${apiKey}`, {
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
      localStorage.setItem('userTokens', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken,
        expiresIn: response.data.expiresIn
      }))

    }
    catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email с таким адресом уже существует'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Недостаточно прав для действия'
          break;
        case 'EMAIL_NOT_FOUND':
          error.value = 'Пользователь с таким Email не найден'
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Неверный пароль'
          break;
        default:
          error.value = 'Что то пошло не так'
          break;
      }
      throw error.value;
    }
    finally {
      loader.value = false;
    }
  }

  return { auth, userInfo, error, loader }
})

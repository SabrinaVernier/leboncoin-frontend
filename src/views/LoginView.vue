<!-- eslint-disable no-undef -->
<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref, inject } from 'vue'

import axios from 'axios'

const contentButton = ref('Se connecter')

const identifier = ref('')
const password = ref('')

const errorMessage = ref('')

const globalStore = inject('GlobalStore')

const router = useRouter()
const route = useRoute()

// bonus1--------
const visiblePassword = ref(false)

// bonus2--------
const clearErrorMessage = () => {
  errorMessage.value = ''
  contentButton.value = 'Se connecter'
}

const userLogin = async () => {
  errorMessage.value = ''
  // console.log('submit')
  if (identifier.value && password.value) {
    contentButton.value = 'Connexion en cours...'
    try {
      const { data } = await axios.post(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local`,
        { identifier: identifier.value, password: password.value },
      )
      globalStore.changeToken({ username: data.user.username, jwt: data.jwt, id: data.user.id })
      console.log('login id >>>', data.user.id)
      console.log('data', data)

      $cookies.set('userInfos', globalStore.connectedUser.value)

      contentButton.value = 'Connecté'

      // ajout condition redirect ou pas navigation guards------
      router.push({ path: route.query.redirect || '/' })
    } catch (error) {
      contentButton.value = 'Se connecter'
      errorMessage.value = '"Invalid identifier or password", veuillez essayer à nouveau '

      console.log('LoginView - catch>>', error)
    }
  } else {
    contentButton.value = 'Se connecter'
    errorMessage.value = 'Veuillez remplir tous les champs'

    console.log('LoginView - else>>>>')
  }
}
</script>
<template>
  <main id="main-loginview">
    <div class="container">
      <form action="log-in" @submit.prevent="userLogin">
        <h2>Bonjour !</h2>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>

        <label
          >E-mail *
          <input
            type="email"
            id="identifier"
            name="identifier"
            v-model="identifier"
            @input="clearErrorMessage()"
          />
        </label>

        <label
          >Mot de passe *
          <div class="div-password">
            <input
              :type="!visiblePassword ? 'password' : 'text'"
              id="password"
              name="password"
              v-model="password"
              @input="clearErrorMessage()"
            /><font-awesome-icon
              :icon="['far', 'eye-slash']"
              @click="visiblePassword = true"
              v-if="!visiblePassword"
            />
            <font-awesome-icon :icon="['far', 'eye']" @click="visiblePassword = false" v-else />
          </div>
        </label>

        <button>{{ contentButton }} <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>

        <p class="error-message">{{ errorMessage }}</p>

        <div class="login">
          <p>
            Envie de nous rejoindre ?
            <RouterLink :to="{ name: 'signup' }">Créer un compte</RouterLink>
          </p>
        </div>
      </form>
    </div>
  </main>
</template>
<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
}

.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url('../assets/imgs/illustration.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  box-shadow: 0 0 7px var(--shadow-grey);
  background-color: #fff;
  border-radius: 10px;
  height: 490px;
  width: 480px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* -------fields--------- */
/* -label--- */
label {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0px;
}

label:nth-of-type(2) div {
  display: flex;
}

label:nth-of-type(2) svg {
  height: 40px;
  width: 40px;
  font-size: 10px;
  padding: 8px;
  border-radius: 0px 10px 10px 0px;
  background-color: #fff;
  border-left: 1px solid var(--middle-grey);
  color: var(--middle-grey);
}

/* -input--- */
input {
  height: 40px;
  width: 100%;
  padding: 10px;
}

input:focus {
  outline: none;
}

input[name='password'] {
  width: calc(100% - 40px);
  border-radius: 10px 0px 0px 10px;
  border: none;
}

input[name='identifier'] {
  border-radius: 10px;
  border: 1px solid var(--middle-grey);
}

.div-password {
  border: 1px solid var(--middle-grey);
  border-radius: 10px;
}

/* -----button 'se connecter'---- */
button {
  height: 40px;
  background-color: var(--orange);
  border-radius: 10px;
  border: none;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0px;
  flex-shrink: 0;
}

/* -----div login------- */
.login {
  align-self: center;
  margin-top: 20px;
}

.login a {
  font-weight: bold;
  color: var(--black);
}

.error-message {
  align-self: center;
  color: var(--orange);
}
</style>

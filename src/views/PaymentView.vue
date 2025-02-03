<script setup>
import { onBeforeMount, onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

// clé publique-------------API-Reacteur--------
const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP',
)

// Ma clé publique ------------mon-backend------
// const stripePromise = loadStripe(
//   'pk_test_51Qmb0dE1eNp1L4yW0zW3sP8YD4LCXNfGcEq1zRwnbbiViCQEcTItJLx51tlSR9btZrgXijw8fmsbGXxmZN39a1so00qzUTdy5b',
// )

const globalStore = inject('GlobalStore')
const router = useRouter()

const props = defineProps({ id: String })

const firstname = ref('')
const lastname = ref('')
const phone = ref(null)
const cardElement = ref(null)
const delivery = ref('atHome')
const offerInfos = ref(null)
const confirmedPayment = ref(false)
const errorMessage = ref('')
const currentTransaction = ref(false)

onBeforeMount(async () => {
  try {
    const stripe = await stripePromise
    const elements = stripe.elements()
    cardElement.value = elements.create('card', {})
    cardElement.value.mount('#card-element')
  } catch (error) {
    console.log('onBefore catch error>>>', error)
  }
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`,
    )

    console.log('onMount data', data.data)
    offerInfos.value = data.data
  } catch (error) {
    console.log('onMount catch error', error)
  }
})

const handlePayment = async () => {
  if (firstname.value && lastname.value) {
    currentTransaction.value = true
    try {
      const stripe = await stripePromise
      const { token } = await stripe.createToken(cardElement.value)
      console.log('stripe token>>>', token)

      const stripeToken = token.id

      // console.log(
      //   {
      //     token: stripeToken,
      //     amount: updateTotal.value,
      //     title: offerInfos.value.attributes.title,
      //   },
      //   globalStore.connectedUser.value[0].jwt,
      // )

      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
        {
          token: stripeToken,
          amount: updateTotal.value,
          title: offerInfos.value.attributes.title,
        },
        {
          headers: {
            Authorization: 'Bearer ' + globalStore.connectedUser.value[0].jwt,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      console.log('data - payment>>>', data)

      if (data.status === 'succeeded') {
        confirmedPayment.value = true
        alert(
          `Paiement de ${updateTotal.value} € validé pour l'achat du produit ${offerInfos.value.attributes.title} par ${lastname.value} ${firstname.value}`,
        )
      }
      router.replace({ name: 'home' })
    } catch (error) {
      console.log('handlePay catch error>>>', error)
    }
    currentTransaction.value = false
  } else {
    errorMessage.value = 'Votre nom et prénom sont obligatoires'
  }
}

const clearErrorMessage = () => {
  errorMessage.value = ''
}

const updateTotal = computed(() => {
  let optionPrice = 0
  if (delivery.value === 'colissimo') {
    optionPrice = 15.6
  }
  return offerInfos.value.attributes.price + 0.99 + optionPrice
})
</script>
<template>
  <main>
    <div class="container">
      <h2>Finalisez votre paiement</h2>
      <div>
        <section class="first-col">
          <div class="identity-infos">
            <div>
              <h3>Informations personnelles</h3>
              <p>Une pièce d’identité vous sera demandée pour récupérer votre colis.</p>
            </div>

            <form action="identity Infos">
              <label for="firstname">Prénom</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Prénom"
                v-model="firstname"
                @input="clearErrorMessage"
              />

              <label for="lastname">Nom</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Nom"
                v-model="lastname"
                @input="clearErrorMessage"
              />

              <label for="phone">Téléphone</label>
              <input type="tel" name="phone" id="phone" placeholder="Téléphone" v-model="phone" />
              <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
            </form>
          </div>

          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>
          <span v-if="confirmedPayment">Commande effectuée</span>
          <div v-else class="card-infos">
            <h3>Coordonnées bancaires</h3>
            <div id="card-element"></div>
            <p v-if="currentTransaction">paiement en cours...</p>
            <div class="button" v-else>
              <button @click="handlePayment">Payer</button>
              <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
            </div>
            <p>
              Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
              compléter votre achat.
            </p>
            <p>
              Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
              nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
            </p>
          </div>
        </section>

        <section class="second-col">
          <div>
            <p v-if="!offerInfos">Chargement en cours....</p>
            <div v-else class="summary-infos">
              <div class="picture">
                <img
                  v-if="offerInfos.attributes.pictures.data[0]"
                  :src="offerInfos.attributes.pictures.data[0].attributes.url"
                  alt="offerPicture"
                />

                <h4>{{ offerInfos.attributes.title }}</h4>
              </div>
              <div class="price">
                <span>{{ offerInfos.attributes.price }},00 €</span>
              </div>
            </div>

            <div class="leboncoin-infos">
              <div class="option">
                <h4>Mode de remise</h4>
                <div class="at-home">
                  <input
                    type="radio"
                    id="atHome"
                    value="atHome"
                    v-model="delivery"
                    @input="updateTotal"
                  />
                  <div>
                    <label for="atHome">Remise en main propre</label>
                    <p>
                      Payez en ligne et récupérez votre achat en main propre lors de votre
                      rendez-vous avec le vendeur
                    </p>
                  </div>
                </div>
                <div class="colissimo">
                  <div>
                    <input
                      type="radio"
                      id="colissimo"
                      value="colissimo"
                      v-model="delivery"
                      @input="updateTotal"
                    />
                    <div>
                      <label for="colissimo">Colissimo </label>
                      <p>à votre domicile sous 2-3 jours</p>
                    </div>
                  </div>
                  <span>15,60€</span>
                </div>
              </div>

              <div class="protection">
                <div>
                  <h4>Protection Leboncoin</h4>
                  <span>0,99€</span>
                </div>
                <div>
                  <font-awesome-icon :icon="['fas', 'check']" />
                  <p>Votre argent est sécurisé et versé au bon moment</p>
                </div>

                <div>
                  <font-awesome-icon :icon="['fas', 'check']" />
                  <p>Notre service client dédié vous accompagne</p>
                </div>
              </div>
            </div>

            <div class="total" v-if="offerInfos">
              <h3>Total</h3>
              <span>{{ updateTotal }} €</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
<style scoped>
.container {
  height: 100%;
  padding: 40px 0px;
}

.container > div {
  display: flex;
  gap: 20px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 20px;
}

h3 {
  font-size: 18px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
  font-weight: bold;
}

p {
  font-size: 12px;
}

section {
  /* border: 1px solid red; */
  height: 100%;
}

section > div {
  box-shadow: 0 0 7px var(--shadow-grey);
  border-radius: 10px;
  height: 100%;
}

/* -----FIRST COLUMN------------- */
.identity-infos {
  width: 670px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  height: 405px;
  gap: 35px;
}

.identity-infos p {
  margin: 5px 0px;
}

.first-col > p {
  margin: 25px 0px;
}

.card-infos {
  height: 245px;
}

/* -----form---------- */
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

form label {
  margin-bottom: 10px;
}

form input {
  height: 45px;
  width: 100%;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid var(--input-grey);
}

form input::placeholder {
  font-size: 16px;
}

form input:not(input[type='tel']) {
  margin-bottom: 30px;
}

/* -----card-element */
.card-infos {
  width: 670px;
  padding: 20px 30px;
}

#card-element {
  /* border: 1px solid plum; */
  border-radius: 10px;
  border: 1px solid var(--input-grey);
  height: 50px;
  width: 100%;
  padding: 15px;
  margin: 20px 0px;
}

.card-infos button {
  background-color: var(--orange);
  border: none;
  padding: 8px 15px;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  margin-bottom: 10px;
}

.card-infos p {
  margin: 5px 0px;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* -----SECOND-COLUMN------------ */

.second-col {
  height: 530px;
  width: 355px;
}

.second-col span {
  color: var(--brown);
  font-weight: bold;
}

/* ---summary--- */
.summary-infos {
  height: 130px;
  padding: 20px 15px 50px 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.summary-infos > div {
  display: flex;
  align-items: center;
}

.picture {
  flex: 2;
  height: 100%;
  display: flex;
  gap: 10px;
}

.price {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

img {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 5px;
}

/* -----leboncoin-infos------- */
.leboncoin-infos {
  border-top: 1px solid var(--input-grey);
  border-bottom: 1px solid var(--input-grey);
  padding: 15px;
}

/* ---option--- */
.option {
  height: 165px;
}

.option p {
  color: var(--under-grey);
  line-height: 25px;
}

.option > div {
  padding: 10px 0px;
  display: flex;
  gap: 10px;
}

.option span {
  margin-left: 70px;
}

.colissimo {
  justify-content: space-between;
}

.colissimo > div {
  display: flex;
}

/* ---protection--- */
.protection {
  height: 135px;
}

.protection > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  line-height: 20px;
}

.protection p {
  font-size: 16px;
}

.protection svg {
  color: var(--green);
  font-size: 20px;
  margin-right: 10px;
}

/* ---total--- */
.total {
  height: 70px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

/* ---error-message--- */
.error-message {
  font-size: 16px;
  color: var(--orange);
}
</style>

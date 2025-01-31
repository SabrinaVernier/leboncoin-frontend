<script setup>
import { onBeforeMount, onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(
  'pk_test_51Qmb0dE1eNp1L4yW0zW3sP8YD4LCXNfGcEq1zRwnbbiViCQEcTItJLx51tlSR9btZrgXijw8fmsbGXxmZN39a1so00qzUTdy5b',
)

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
          `Paiement de ${updateTotal.value} validé pour l'achat du produit${offerInfos.value.attributes.title} par ${lastname.value} ${firstname.value}`,
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
    <h2 class="container">Finalisez votre paiement</h2>
    <div class="container">
      <section class="user-infos">
        <div class="identity-infos">
          <h3>Informations personnelles</h3>
          <p>Une pièce d’identité vous sera demandée pour récupérer votre colis.</p>

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
          Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la commande.
        </p>
        <p v-if="confirmedPayment">Commande effectuée</p>
        <div v-else class="card-infos">
          <h3>Coordonnées bancaires</h3>
          <div id="card-element"></div>
          <p v-if="currentTransaction">paiement en cours...</p>
          <button v-else @click="handlePayment">Payer</button>
          <p>
            Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour compléter
            votre achat.
          </p>
          <p>
            Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
            nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
          </p>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </section>

      <section class="offer-info">
        <p v-if="!offerInfos">Chargement en cours....</p>
        <div v-else class="summary-infos">
          <div>
            <div v-if="offerInfos.attributes.pictures.data[0]">
              <img
                :src="offerInfos.attributes.pictures.data[0].attributes.url"
                alt="offerPicture"
              />
            </div>
            <p>{{ offerInfos.attributes.title }}</p>
          </div>
          <p>{{ offerInfos.attributes.price }} €</p>
        </div>

        <div>
          <h4>Mode de remise</h4>
          <label for="atHome">Remise en main propre</label>
          <input type="radio" id="atHome" value="atHome" v-model="delivery" @input="updateTotal" />

          <label for="colissimo">Colissimo 15,60€</label>
          <input
            type="radio"
            id="colissimo"
            value="colissimo"
            v-model="delivery"
            @input="updateTotal"
          />
        </div>

        <div>
          <h4>Protection Leboncoin 0,99€</h4>
          <p><span>Icon</span>Votre argent est sécurisé et versé au bon moment</p>
          <p><span>Icon</span>Notre service client dédié vous accompagne</p>
        </div>

        <div v-if="offerInfos">
          <p>Total</p>
          <p>{{ updateTotal }} €</p>
        </div>
      </section>
    </div>
  </main>
</template>
<style scoped>
.container {
  display: flex;
  gap: 10px;
}
section {
  border: 1px solid red;
}

div {
  border: 1px solid green;
}

#card-element {
  border: 1px solid plum;
  height: 50px;
  width: 400px;
  padding: 10px;
}
p {
  font-size: 12px;
}

/* -----section offerInfos----- */
.summary-infos {
  display: flex;
}
img {
  height: 50px;
  width: 50px;
  object-fit: cover;
}
</style>

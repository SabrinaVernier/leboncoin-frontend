<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

const globalStore = inject('GlobalStore')

const router = useRouter()

const title = ref('')
const content = ref('')
const price = ref(null)
const pictures = ref(null)
const isSubmitting = ref(false)

const errorMessage = ref('')

// error +10 pictures---------
const handleInputFiles = (event) => {
  errorMessage.value = ''
  pictures.value = event.target.files
  if (pictures.value.length > 10) {
    errorMessage.value = `10 photos maximum ! ( ${pictures.value.length} sélectionnées)`
    alert(`10 photos maximum ! ( ${pictures.value.length} sélectionnées)`)

    pictures.value = null
  }
}

// preview pictures---------
const picturesListPreview = computed(() => {
  const tab = []
  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  return tab
})

// submit-publish---------
const handleSubmit = async () => {
  if (title.value && content.value && price.value && pictures.value) {
    // console.log('globalStore', globalStore.connectedUser.value[0].jwt)
    isSubmitting.value = true
    const formData = new FormData()

    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }

    console.log('pictures value>>>', pictures.value)

    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: content.value,
      price: price.value,
      owner: globalStore.connectedUser.value[0].id,
    })

    formData.append('data', stringifiedInfos)

    console.log('formData>>>', formData)

    try {
      const { data } = await axios.post(
        'https://site--leboncoin-backend--2ztmlbwdnwqd.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + globalStore.connectedUser.value[0].jwt,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      console.log('Publish - response request>>>', data)
      //accès id de l'article créé-------
      console.log('Publish - offer id>>>', data.data.id)
      //redirection vers page OfferView avec params----
      router.push({ name: 'offerView', params: { id: data.data.id } })
    } catch (error) {
      console.log('catch error publish>>>', error)
    }

    isSubmitting.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs !!!'
  }
}
</script>
<template>
  <main id="main-publish">
    <div class="container">
      <h3>Déposer une annonce</h3>

      <form action="publish" @submit.prevent="handleSubmit">
        <div>
          <label for="title">Titre de l'annonce</label>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              v-model="title"
              @input="
                () => {
                  errorMessage = ''
                }
              "
            />
            <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>
          </div>
        </div>

        <div class="content-bloc">
          <label for="content">Description de l'annonce</label>
          <div>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="12"
              v-model="content"
              @input="
                () => {
                  errorMessage = ''
                }
              "
              placeholder="Votre texte ici ........"
            ></textarea>
            <p>
              Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
              ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
              série, facture, certificat, inscription de la marque sur l’article, emballage etc.
              Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
              l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne
              pourra pas demander le remboursement ou l’échange du bien ou service proposé
            </p>
          </div>
        </div>

        <div>
          <label for="price">Votre prix de vente</label>
          <div class="price-bloc">
            <input
              type="number"
              name="price"
              id="price"
              v-model="price"
              @input="
                () => {
                  errorMessage = ''
                }
              "
            /><span class="euros">€</span>
          </div>
        </div>

        <div class="select-picture">
          <label for="pictures"
            >Ajoutez des photos
            <div class="select-pictures">
              <font-awesome-icon :icon="['fas', 'camera']" />
              <span class="max-pictures">Sélectionnez jusqu'à 10 photos</span>
            </div>

            <input type="file" name="pictures" id="pictures" multiple @input="handleInputFiles" />
          </label>

          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <div class="pictures-preview" v-if="pictures">
          <div v-for="picture in picturesListPreview" :key="picture">
            <img :src="picture" alt="picture preview" />
          </div>
        </div>

        <button v-if="!isSubmitting">Déposer mon annonce</button>
        <button v-else style="background-color: var(--sweet-orange)">Envoi en cours...</button>
      </form>
    </div>
  </main>
</template>
<style scoped>
main {
  background-color: var(--light-grey);
  padding-top: 40px;
}

.container {
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
}

/* -----form------------- */
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

form > div:not(.pictures-preview) {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

input,
textarea {
  border: solid 1px var(--grey);
  border-radius: 10px;
}

input[type='text'],
textarea {
  width: 770px;
  padding: 13px;
}

input[type='text'],
input[type='number'] {
  height: 45px;
}

p {
  font-size: 12px;
  color: var(--grey);
  margin-top: 10px;
}

.content-bloc p {
  width: 770px;
  text-align: justify;
}

/* --input-number-- */
.price-bloc {
  display: flex;
}

input[type='number'] {
  width: 185px;
  padding: 10px;
  border-right: unset;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
}

.euros {
  border: solid 1px var(--grey);
  border-radius: 0px 15px 15px 0px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

/* ---hide arrows input[type="number"]--- */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
/* input[type=number] {
  -moz-appearance: textfield;
} */

/* -----files---- */
.select-pictures {
  border: 1px solid var(--blue);
  padding: 10px;
  margin-top: 15px;
  height: 150px;
  width: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
}

svg {
  font-size: 35px;
  color: var(--blue);
}

.max-pictures {
  font-size: 16px;
  color: var(--blue);
  text-align: center;
  line-height: 20px;
}

input[type='file'] {
  display: none;
}

/* ---pictures preview--- */
.pictures-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.pictures-preview > div {
  width: calc((100% - 40px) / 5);
  aspect-ratio: 1 / 1;
}

.pictures-preview img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* -----button validation----- */
button {
  align-self: flex-end;
  background-color: var(--orange);
  border: none;
  padding: 8px 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
}
/* -----error message--------- */
.error-message {
  font-size: 18px;
  color: var(--orange);
  align-self: center;
}
</style>

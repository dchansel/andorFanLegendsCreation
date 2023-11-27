<template>
  <div v-if="newCardOpenIndex">
    <el-form label-width="120px" @submit.native.prevent="close">
      <el-form-item label="Nom de la Carte">
        <el-input
          v-model="cardData.name"
          aria-required=""
          :maxlength="(cardData.type === 'letter') ? 2 : 100"
          @input="setSlug"
        />
      </el-form-item>
      <el-form-item label="Type de Carte">
        <el-radio-group v-model="cardData.type">
          <el-radio label="letter">Lettre</el-radio>
          <el-radio label="end">Fin du jeu (N, en général)</el-radio>
          <el-radio label="put">Cartes de la Piste</el-radio>
          <el-radio label="custom">Autres</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="(cardData.type === 'custom')" label="Sous-titre">
        <el-input
          v-model="cardData.subname"
          required
          placeholder="La carte est révélée lorsque"
          :disabled="(cardData.type === 'letter')"
        />
      </el-form-item>
      <el-form-item v-if="(cardData.type !== 'end')" label="Text de Carte">
        <el-input v-model="cardData.text" type="textarea" required rows="10" />
      </el-form-item>
      <div v-if="(cardData.type === 'end')">
        <el-form-item label="Erfolgstext">
          <el-input v-model="cardData.success" type="textarea" required rows="7" />
        </el-form-item>
        <el-form-item label="Misserfolg">
          <el-input v-model="cardData.failure" type="textarea" required rows="7" />
        </el-form-item>
      </div>
      <small class="markdownText">
        Le Texte supporte
        <a
          href="https://help.github.com/articles/basic-writing-and-formatting-syntax/"
          target="_blank"
          rel="noopener"
        >Markdown</a>
      </small>
      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-button type="info" @click="close">Fermer</el-button>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" native-type="submit">Enregistrer</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <CardPreview :card-data="cardData" :name="name" :type="type" :series="series" :number="number" style="margin: 0 auto;" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardPreview from "andor-legendenkarte";

export default {
  components: { CardPreview },
  computed: {
    ...mapState(["newCardOpenIndex", "name"]),
    ...mapState(["newCardOpenIndex", "type"]),
    ...mapState(["newCardOpenIndex", "number"]),
    ...mapState(["newCardOpenIndex", "series"]),
    cardData() {
      return this.$store.state.cards.find(
        i => i.id === this.$store.state.newCardOpenIndex
      );
    }
  },
  methods: {
    close() {
      this.$store.commit("closeCardWindow");
    },
    setSlug(){
      this.$store.commit('setSlug', this.cardData.name);
    }
  }

};
</script>

<style scoped>
.markdownText {
  margin-top: -15px;
  display: block;
  padding-bottom: 20px;
  text-align: right;
}
</style>

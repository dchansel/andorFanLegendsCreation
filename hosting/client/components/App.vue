<template>
  <el-container class="fullHeight">
    <el-container>

      <el-main class="main">
        <el-container class="fullHeight">
          <el-header style="height: auto;">
            
          </el-header>
          <el-main>
            <BasicInfos />
            
          </el-main>
          <el-footer class="footer">
            <PDFandSave />
          </el-footer>
        </el-container>
      </el-main>

      <el-aside width="70%">
        <el-container class="fullHeight">
          <el-main>
            <NewCard />
          </el-main>
        </el-container>
      </el-aside>
    </el-container>
    <!--<el-footer class="footer footer_border">
      <small>Andor/Die Legenden von Andor ist eine Marke des Autors Michael Menzel und der Franckh-Kosmos Verlags-GmbH &amp; Co. KG. Diese Webanwendungen und deren Inhalte sind keine offiziellen Andor-Produkte und sind weder vom Autor noch vom Verlag gesponsert, autorisiert oder unterstützt. Dies ist ein Open-Source-Projekt der Andor-Community.</small>
      <el-button size="mini" @click="openGoogleForms">Kontakt / Feedback</el-button>
    </el-footer>-->
    <PDFView />
  </el-container>
</template>

<script>
import BasicInfos from "./BasicInfos/BasicInfos";
import PDFandSave from "./PDFandSave/PDFandSave";
//import CardsOverview from "./CardsOverview/CardsOverview";
import NewCard from "./NewCard/NewCard.vue";
import PDFView from "./PDFView/PDFView.vue";

// Code Splitting for PDF-View
//const PDFView = () => import("./PDFView/PDFView.vue");

export default {
  components: { BasicInfos, PDFandSave, NewCard, PDFView },
  methods: {
    /*openGoogleForms() {
      window.open("https://goo.gl/forms/834NVBDKokUASJeq1");
    },*/
    /*handleNewCard() {
      this.$store.commit("addCard");
    }*/
  }
};
</script>

<style scoped>
.fullHeight {
  height: 100%;
}
.main {
  background-color: #f8f8f8;
}
.footer {
  display: flex;
  align-items: center;
}

.footer_border {
  border-top: 1px solid rgba(128, 128, 128, 0.3);
}

.footer small {
  font-size: 12px;
  margin-right: 50px;
}
</style>
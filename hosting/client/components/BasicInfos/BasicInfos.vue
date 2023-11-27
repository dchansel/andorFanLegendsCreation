<template>
  <el-form>
    <el-form-item label="Nom de la Légende" style="font-weight: bold">
      <el-input v-model="name" placeholder="Name der Legende" />
    </el-form-item>
    <el-form-item label="Type de légende" style="font-weight: bold">
      <el-radio-group v-model="type">
        <el-radio label="single">Unique</el-radio>
        <el-radio label="series">Plusieurs Chapitres</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="(type === 'series')" label="Nom de la Saga">
      <el-input
        v-model="series"
        placeholder="Nom de la Saga"
      />
    </el-form-item>
    <el-form-item v-if="(type === 'series')" label="Numéro de Légende">
      <el-input
        v-model="number"
        placeholder="Numéro de la légende dans la série"
        :maxlength="1"
      />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("setName", value);
      }
    },
    type: {
      get() {
        return this.$store.state.type;
      },
      set(value) {
        if (value == 'single') {
          this.$store.commit("setSeries", '');
          this.$store.commit("setNumber", '');
        }
        this.$store.commit("setType", value);
      }
    },
    series: {
      get() {
        return this.$store.state.series;
      },
      set(value) {
        this.$store.commit("setSeries", value);
      }
    },
    number: {
      get() {
        return this.$store.state.number;
      },
      set(value) {
        this.$store.commit("setNumber", value);
      }
    }
  }
};
</script>

<style scoped>
</style>

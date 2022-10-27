<template>
  <div>
    <div v-for="(word, i) in exercise[currentWord].choices" :key="i">
      {{ word }}
    </div>
    <v-btn @click="moveNext">Go next</v-btn>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Exercise extends Vue {
  exercise = null;
  currentWord = 0;
  async mounted() {
    this.exercise = await (
      await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/exercises/${this.$route.params.id}`
      )
    ).data;
  }

  moveNext() {
    this.currentWord++;
  }
}
</script>

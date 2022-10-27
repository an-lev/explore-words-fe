<template>
  <v-container v-if="!loading">
    <v-row>
      <v-col>Module: {{ module.name }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-text-field
          outlined
          label="Text"
          dense
          v-model="wordText"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          outlined
          label="Translate"
          dense
          v-model="wordTranslate"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          @click="addWord"
          :disabled="creating"
          :loading="creating"
          >Add</v-btn
        >
      </v-col>
    </v-row>

    <v-row v-for="(word, i) in module.words" :key="i">
      <v-col cols="5">{{ word.text }}</v-col>
      <v-col cols="5">{{ word.translate }}</v-col>
      <v-col cols="2">
        <v-btn color="red" @click="removeWord(word.id)" dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <hr />
    </v-row>
  </v-container>
  <span v-else>loading...</span>
</template>

<script lang="ts">
import axios from "axios";
import { Vue, Component } from "vue-property-decorator";

type Word = {
  id: string;
  text: string;
  translate: string;
};

type Module = {
  id: string;
  name: string;
  description: string;
  words: Word[];
};

@Component({ name: "module" })
export default class ModuleDetails extends Vue {
  module: Module | null = null;
  loading = true;
  creating = false;

  wordText = "";
  wordTranslate = "";

  async mounted() {
    try {
      this.module = await (
        await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/modules/${this.$route.params.id}`
        )
      ).data;
    } finally {
      this.loading = false;
    }
  }

  async addWord() {
    if (!(this.wordText && this.wordTranslate)) return;

    try {
      this.creating = true;

      const createdWord = await (
        await axios.post<Word>(`${process.env.VUE_APP_BASE_URL}api/words`, {
          moduleId: this.module.id,
          text: this.wordText,
          translate: this.wordTranslate,
        })
      ).data;

      this.module.words.push(createdWord);
      this.wordText = "";
      this.wordTranslate = "";
    } finally {
      this.creating = false;
    }
  }

  async removeWord(wordId: string) {
    await axios.delete(`${process.env.VUE_APP_BASE_URL}api/words/${wordId}`);

    this.module.words = this.module.words.filter((x) => x.id !== wordId);
  }
}
</script>
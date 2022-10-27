<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="(exercise, i) in exercises" :key="i">
        <v-card>
          <v-card-title>{{ exercise.title }}</v-card-title>
          <v-card-text>{{ exercise.description }}</v-card-text>
          <v-card-actions>
            <v-btn link :to="{ name: 'exercise', id: exercise.id }">
              Let's go
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "exercises" })
export default class Exercises extends Vue {
  exercises = [];

  async mounted() {
    this.exercises = await (
      await axios.get(`${process.env.VUE_APP_BASE_URL}api/exercises`)
    ).data;
  }
}
</script>
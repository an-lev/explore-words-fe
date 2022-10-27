<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col>
        <v-card max-width="250px">
          <v-card-title>Modules</v-card-title>
          <v-card-actions>
            <v-btn link :to="{ name: 'modules' }">Navigate</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="250px">
          <v-card-title>Exercises</v-card-title>
          <v-card-actions>
            <v-btn link :to="{ name: 'exercises' }">Navigate </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
});
</script>

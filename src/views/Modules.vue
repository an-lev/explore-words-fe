<template>
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" class="ew-module">
              <v-icon size="72">mdi-folder-plus-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Create new module
            </v-card-title>

            <v-card-text>
              <v-row class="mt-4">
                <v-col cols="12">
                  <v-text-field outlined label="Name" dense></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea outlined label="Description" dense></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn depressed @click="dialog = false"> Cancel </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="createModule"> Create </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col v-for="(module, i) in modules" :key="i">
        <v-btn color="primary" class="ew-module">{{ module.name }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({ name: "modules" })
export default class ModulesView extends Vue {
  modules = [];
  dialog: boolean | null = null;

  newModuleName = "";
  newModuleDescription = "";

  async mounted() {
    this.modules = await (
      await axios.get("https://localhost:7268/api/modules")
    ).data;
  }

  async createModule() {
    try {
      await axios.post("https://localhost:7268/api/modules", {
        name: this.newModuleName,
        description: this.newModuleDescription,
      });
      this.dialog = false;
    } catch {
      //
    }
  }
}
</script>

<style scoped>
.ew-module {
  height: 200px !important;
  width: 200px;
}
</style>

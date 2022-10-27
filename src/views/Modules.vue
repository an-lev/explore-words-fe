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
                  <v-text-field
                    outlined
                    label="Name"
                    dense
                    v-model="newModuleName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    label="Description"
                    dense
                    v-model="newModuleDescription"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn depressed @click="dialog = false"> Cancel </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="createModule"
                :disabled="creating"
                :loading="creating"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col v-for="(module, i) in modules" :key="i">
        <v-btn
          color="primary"
          class="ew-module"
          link
          :to="{ name: 'module', params: { id: module.id } }"
          >{{ module.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({ name: "modules" })
export default class ModulesView extends Vue {
  modules: any[] = [];
  dialog: boolean | null = null;

  creating = false;
  newModuleName = "";
  newModuleDescription = "";

  async mounted() {
    this.modules = await (
      await axios.get(`${process.env.VUE_APP_BASE_URL}api/modules`)
    ).data;
  }

  async createModule() {
    try {
      this.creating = true;
      const createdModule = await (
        await axios.post(`${process.env.VUE_APP_BASE_URL}api/modules`, {
          name: this.newModuleName,
          description: this.newModuleDescription,
        })
      ).data;
      this.modules.push(createdModule);

      this.dialog = false;
      this.newModuleName = "";
      this.newModuleDescription = "";
    } catch {
      //
    } finally {
      this.creating = false;
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

<template>
  <v-card>
    <v-layout>
      <!-- Can be usefull when we will have a capacitor app to have a small header on top of the screen -->
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar color="background">
        <v-btn variant="text" icon="mdi-home" color="lightBlack">
          <NuxtLink to="/">
            <v-img
              src="assets/svg/repairnow-logo-xs.svg"
              alt="RepairNow logo"
              width="36"
              height="36"
            />
          </NuxtLink>
        </v-btn>

        <v-spacer />

        <v-btn
          rounded
          @click.stop="handleClickDrawer('drawerMain')"
          color="primary"
        >
          <v-toolbar-title class="tw-text-xl tw-font-semibold"
            >Obtenir un réparateur</v-toolbar-title
          >
        </v-btn>

        <v-spacer />

        <v-btn
          variant="text"
          icon="mdi-menu"
          @click.stop="handleClickDrawer('drawerRight')"
          color="lightBlack"
        ></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawerMain" location="bottom" temporary>
        <h2 class="tw-text-center tw-text-xl tw-font-bold tw-p-5">
          Demander un service
        </h2>
        <v-list :items="items"></v-list>
      </v-navigation-drawer>

      <v-navigation-drawer
        v-model="drawerRight"
        location="bottom"
        temporary
        width="300"
      >
        <div class="tw-p-5 tw-flex tw-justify-between tw-items-center tw-pb-2">
          <h2 class="tw-text-xl tw-font-bold">
            Bonjour {{ dataUser.firstname }}!
          </h2>

          <v-avatar size="68">
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
        </div>
        <ul>
          <li>
            <v-btn
              variant="text"
              class="tw-w-full tw-justify-start text-none"
              size="large"
              color="unset"
            >
              <v-icon
                slot="prependIcon"
                color="primary"
                icon="mdi-bookmark-multiple-outline"
                class="tw-mr-2"
              />
              Mes demandes
            </v-btn>
          </li>
          <li>
            <v-btn
              variant="text"
              class="tw-w-full justify-start text-none"
              size="large"
              color="unset"
            >
              <v-icon
                slot="prependIcon"
                color="primary"
                icon="mdi-bell-outline"
                class="tw-mr-2"
              />
              Notifications
            </v-btn>
          </li>
          <li>
            <v-btn
              variant="text"
              class="tw-w-full justify-start text-none"
              size="large"
              color="unset"
            >
              <v-icon
                slot="prependIcon"
                color="primary"
                icon="mdi-message-outline"
                class="tw-mr-2"
              />
              Messagerie
            </v-btn>
          </li>
          <li>
            <NuxtLink to="/account">
              <v-btn
                variant="text"
                class="tw-w-full justify-start text-none"
                size="large"
                color="unset"
              >
                <v-icon
                  slot="prependIcon"
                  color="primary"
                  icon="mdi-account-outline"
                  class="tw-mr-2"
                />
                Compte
              </v-btn>
            </NuxtLink>
          </li>
        </ul>
      </v-navigation-drawer>

      <v-main>
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const drawerMain = ref(false);
const drawerRight = ref(false);

const handleClickDrawer = (name) => {
  if (name === "drawerMain") {
    drawerMain.value = !drawerMain.value;
    drawerRight.value = false;
  } else if (name === "drawerRight") {
    drawerRight.value = !drawerRight.value;
    drawerMain.value = false;
  }
};

const items = [
  { title: "Bricolage", icon: "mdi-home" },
  { title: "Jardinage", icon: "mdi-help-box" },
  { title: "Cours particulier", icon: "mdi-email" },
];

const dataUser = {
  firstname: "John",
};
</script>

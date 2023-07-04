<template>
  <div class="tw-flex tw-flex-col tw-gap-5 tw-m-5 xl:tw-mx-64">
    <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
      Position du prestataire
    </div>
    <div class="map-wrapper">
      <l-map v-if="clientCoord !== null && contractorCoord !== null" ref="map" v-model:zoom="zoom" :center="[clientCoord.x, clientCoord.y]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="[clientCoord.x, clientCoord.y]">
          <l-icon :icon-size="[21, 21]">★</l-icon>
        </l-marker>
        <l-marker :lat-lng="[clientCoord.x, clientCoord.y]"></l-marker>
        <l-marker :lat-lng="[clientCoord.x, clientCoord.y]"></l-marker>
      </l-map>
    </div>
    <div class="tw-flex tw-flex-col">
        <!-- <p class="tw-text-center tw-text-red-500 tw-pb-2">{{formError}}</p> -->
        <p class="tw-text-xl tw-mb-3">Entrez vos coordonnées</p>
        <p>Votre latitude (x)</p>
        <v-text-field
          v-model="clientCoord.x"
          prepend-inner-icon="mdi-map-marker"
          variant="filled"
          label="Latitude (x)*"
          class="rounded-lg"
        />
        <p>Votre longitude (y)</p>
        <v-text-field
          v-model="clientCoord.y"
          prepend-inner-icon="mdi-map-marker"
          variant="filled"
          label="Longitude (y)*"
          class="rounded-lg"
        />
    </div>
  </div>
</template>
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import { useGeolocStore } from "@/stores/geoloc";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const zoom = 12;
const clientCoord = ref({
  x: 0,
  y: 0,
});
const contractorCoord = ref({
  x: 0,
  y: 0,
});

// Récupérer la position du prestataire
const geolocStore = useGeolocStore();
const { getAnnouncementGeoloc } = useGeolocStore();

onMounted(async () => {
  // get geolocation from url path variable
  const { params } = useRoute();
  const { announcementId } = params;
  console.log(announcementId);

  await getAnnouncementGeoloc(announcementId);
  const {geoloc} = storeToRefs(geolocStore);
  contractorCoord.value.x = geoloc.value.x;
  contractorCoord.value.y = geoloc.value.y;
});

</script>

<style scoped>
.map-wrapper {
    height: 75vh;
    width: 100%;
}

.map-wrapper img {
    display: inline-block;
}
</style>

<style>
.leaflet-div-icon {
  background: steelblue;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
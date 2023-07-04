<template>
    <l-map ref="map" :zoom="2" :center="[47.41322, -1.219482]" style="width: 1000px;">
        <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        style="width: 1000px;"
        ></l-tile-layer>
        <l-control-zoom position="bottomright" zoom-in-text="*" zoom-out-text="/" />
    </l-map>
</template>
<script setup lang="ts">
import { LControlZoom, LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
</script>

<style scoped>

</style>
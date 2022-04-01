<template>
  <div class="h-screen max-h-screen">
    <!-- Search / Results-->
    <div class="z-20 absolute pt-10 ml-4 sm:ml-10">
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <div class="flex">
          <input
            v-model="queryIP"
            type="text"
            class="w-72 py-3 opacity-75 bg-gray-100 px-2 rounded-tl-md rounded-bl-md outline-none placeholder-gray-600"
            placeholder="Search IP, blank = self info"
            @keyup.enter="getIpInfo"
          />
          <ChevronRight
            class="w-11 h-12 cursor-pointer bg-gray-600 text-white rounded-tr-md rounded-br-md flex items-center"
            @click="getIpInfo"
          />
        </div>
      </div>
      <div
        v-if="error"
        class="bg-white text-bold text-red-600 rounded-lg mt-2 p-1 flex mx-auto justify-center"
      >
        Please provide valid id
      </div>
      <!-- IP Info-->
      <IPInfo v-if="ipInfo && !error" v-bind:ipInfo="ipInfo" />
    </div>

    <!-- Map -->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script setup>
import IPInfo from '../components/IPInfo.vue';
import ChevronRight from '../components/icons/ChevronRight.vue';
import leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
import axios from 'axios';

let mymap;
let error = ref(null);
let layerGroup = leaflet.layerGroup();

const queryIP = ref('');
const ipInfo = ref(null);

// onMount get request user IP
onMounted(async () => {
  const data = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_IHLnxkiPdY3h6J0XxspzeOFb2P614&ipAddress=`
  );

  const result = data.data;
  ipInfo.value = {
    adress: result.ip,
    state: result.location.region,
    timezone: result.location.timezone,
    isp: result.isp,
    lat: result.location.lat,
    lng: result.location.lng,
  };

  mymap = leaflet
    .map('mapid', { zoomControl: false })
    .setView([ipInfo.value.lat, ipInfo.value.lng], 13);

  if (mymap.hasLayer(layerGroup)) {
    layerGroup.clearLayers();
  }

  let marker = leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]);
  layerGroup.addLayer(marker);
  mymap.addLayer(layerGroup);

  leaflet
    .tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoic3RhYXBoIiwiYSI6ImNsMWNuOTR1djAxMW8zY2xuaWZ5ZTN2ancifQ.WXEzWEp6e23j2LcWanOgkQ',
      }
    )
    .addTo(mymap);
});

// request given IP on click, set error to true to show error
const getIpInfo = async () => {
  try {
    const data = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_IHLnxkiPdY3h6J0XxspzeOFb2P614&ipAddress=${queryIP.value}`
    );

    const result = data.data;
    ipInfo.value = {
      adress: result.ip,
      state: result.location.region,
      timezone: result.location.timezone,
      isp: result.isp,
      lat: result.location.lat,
      lng: result.location.lng,
    };

    // mymap.removeLayer(marker);
    if (mymap.hasLayer(layerGroup)) {
      layerGroup.clearLayers();
    }

    let marker = leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]);
    layerGroup.addLayer(marker);
    mymap.addLayer(layerGroup);

    mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
    error.value = false;
  } catch (err) {
    error.value = true;
  }
};
</script>

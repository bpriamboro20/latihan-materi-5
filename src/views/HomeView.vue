<template>
  <div class="home">
    <npm />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import npm from "@/components/Npm.vue";

export default {
  name: "HomeView",
  components: {
    npm,
  },
};
</script>

<template>
  <div>
    <button @click="goBack">Kembali</button>

    <h2>{{ todoList[index] }}</h2>
    <form @submit.prevent="tambahkanDeskripsi">
      <input type="text" v-model="deskripsi" placeholder="Input deskripsi disini" />
      <button type="submit">Tambahkan</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "DetailView",
  data() {
    return {
      deskripsi: "", // Input untuk menambahkan deskripsi
    };
  },
  computed: {
    todoList() {
      return this.$store.getters.todoList;
    },
    index() {
      // Ambil indeks dari parameter route
      return parseInt(this.$route.params.index);
    },
  },
  methods: {
    tambahkanDeskripsi() {
      if (this.deskripsi.trim() === "") {
        alert("Inputan harus diisi dan tidak boleh kosong ya");
      } else {
        this.$store.dispatch("addDescription", this.deskripsi);
        this.deskripsi = ""; // Kosongkan input setelah item ditambahkan
      }
    },
    goBack() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya
    },
  },
};
</script>

<style scoped>
form input {
  width: 80%;
  margin-right: 20px;
}
</style>

<template>
  <div class="container">
    <h1>To Do List</h1>
    <ol class="orderlist">
      <li v-for="(activity, index) in todoList" :key="index" class="listitems">
        <span v-if="notEditing(index)" @click="goToDetail(index)">{{ activity }}</span>
        <input v-else v-model="editList" @keyup.enter="selesaiEdit" />
        <button v-if="notEditing(index)" @click="hapus(index)">Hapus</button>
        <button v-if="notEditing(index)" @click="edit(index)">Edit</button>

        <template v-else>
          <button @click="selesaiEdit">Selesai</button>
          <button @click="batal">Batal</button>
        </template>
      </li>
    </ol>
    <form @submit.prevent="tambahkan">
      <input type="text" v-model="list" placeholder="Tambah aktivitas baru" class="form-input" />
      <button type="submit">Tambahkan</button>
    </form>
    <p v-if="isMoreFour">{{ isMoreFour }}</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      list: "", // Input untuk menambahkan item baru
      editList: "", // Input untuk mengedit item
      editIndex: null, // Indeks item yang sedang diedit
    };
  },
  computed: {
    todoList() {
      return this.$store.getters.todoList;
    },
    isMoreFour() {
      return this.$store.getters.isMoreFour;
    },
  },
  methods: {
    tambahkan() {
      if (this.list.trim() === "") {
        alert("Inputan harus diisi dan tidak boleh kosong ya");
      } else {
        this.$store.dispatch("addItem", this.list);
        this.list = ""; // Kosongkan input setelah item ditambahkan
      }
    },
    hapus(index) {
      this.$store.dispatch("removeItem", index);
    },
    edit(index) {
      this.editList = this.todoList[index];
      this.editIndex = index;
    },
    selesaiEdit() {
      if (this.editList.trim() === "") {
        alert("Inputan harus diisi dan tidak boleh kosong ya");
      } else {
        this.$store.dispatch("editItem", { index: this.editIndex, item: this.editList });
        this.editIndex = null;
        this.editList = "";
      }
    },
    notEditing(index) {
      return this.editIndex !== index;
    },
    batal() {
      this.editIndex = null;
      this.editList = "";
    },
    goToDetail(index) {
      this.$router.push({ name: "detail", params: { index } });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.container form input {
  width: 80%;
  margin-right: 20px;
}

.orderlist {
  width: 80%;
}

.orderlist span {
  cursor: pointer;
}

.listitems {
  width: 80%;
  padding: 7px 0;
}

.listitems span {
  width: 60%;
  display: inline-block;
}

ol li button {
  margin: 0px 50px;
}
</style>

<template>
  <div class="list">
    <h1>What needs to be done?</h1>
    <div class="list__items">
      <div
        class="list__item"
        v-for="item in items"
        :key="item.id"
        :class="itemClasses(item)"
      >
        <span class="list__task left" @click="makeCompleted(item)">{{
          item.task
        }}</span>
        <span v-if="item.deadline">{{ item.deadline }}</span>
        <button :disabled="item.isCompleted" @click="deleteItem(item)">
          Delete
        </button>
      </div>
    </div>
    <button class="list__add" @click="$router.push('/edit')">New item</button>
    <div class="list__toolbar">
      <span class="left">{{ counterText() }}</span>
      <button @click="fullList">All</button>
      <button @click="filteredList('activeItems')">Active</button>
      <button @click="filteredList('completedItems')">Completed</button>
      <button
        :disabled="clearBtnVisible()"
        class="right"
        @click="clearCompleted()"
      >
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  beforeMount() {
    if (store.state.items.length === 0) this.$router.push("/");
  },
  data() {
    return {
      items: store.getters.stateItems,
      filteredItems: {
        isCompleted: store.getters.completedItems,
        isActive: store.getters.activeItems,
      },
    };
  },
  methods: {
    toStart() {
      if (this.items.length === 0) this.$router.push("/");
    },

    itemClasses(item) {
      return {
        "list__item-red": item.priority === "high",
        "list__item-yellow": item.priority === "medium",
        "list__item-green": item.priority === "low",
        "list__item-done": item.isCompleted,
      };
    },

    fullList() {
      this.items = this.$store.state.items;
    },

    filteredList(str) {
      this.items = this.$store.getters[str];
    },

    makeCompleted(item) {
      this.$store.commit("makeCompleted", item.id);
    },

    deleteItem(item) {
      this.$store.commit("deleteItem", item.id);
      this.toStart();
    },

    counterText() {
      const num = this.$store.getters.activeItems.length;
      return `${num} ${num === 1 ? "item" : "items"} left`;
    },

    clearBtnVisible() {
      return this.$store.getters.completedItems.length === 0;
    },

    clearCompleted() {
      this.$store.commit("clearCompleted");
      this.items = this.$store.state.items;
      this.toStart();
    },
  },
};
</script>
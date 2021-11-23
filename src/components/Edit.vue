<template>
  <div class="edit">
    <label class="edit__label">
      Task
      <input
        type="text"
        class="edit__input"
        @input="taskInput = $event.target.value"
        @keypress.enter="btnSubmit"
      />
    </label>
    <label class="edit__label">
      Deadline
      <input
        type="date"
        class="edit__input"
        @input="dateInput = $event.target.value"
        @keypress.enter="btnSubmit"
      />
      <input
        type="time"
        class="edit__input"
        @input="timeInput = $event.target.value"
        @keypress.enter="btnSubmit"
      />
    </label>
    <details class="edit__details">
      <summary class="edit__label">Priority</summary>
      <div class="edit__priority">
        <input
          type="radio"
          name="priority"
          class="edit__radio edit__radio-red"
          @input="priorityInput = 'high'"
          @keypress.enter="btnSubmit"
        />
        <input
          type="radio"
          name="priority"
          class="edit__radio edit__radio-yellow"
          @input="priorityInput = 'medium'"
          @keypress.enter="btnSubmit"
        />
        <input
          type="radio"
          name="priority"
          class="edit__radio edit__radio-green"
          @input="priorityInput = 'low'"
          @keypress.enter="btnSubmit"
        />
      </div>
    </details>
    <div class="edit__btns">
      <button class="btn edit__btn" @click="btnCancel">Cancel</button>
      <button class="btn edit__btn" @click="btnSubmit">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskInput: false,
      dateInput: false,
      timeInput: false,
      priorityInput: false,
    };
  },
  methods: {
    btnCancel() {
      this.$store.state.items.length > 0
        ? this.$router.push("/list")
        : this.$router.push("/");
    },
    btnSubmit() {
      if (!this.taskInput) return;
      const date = this.dateInput ? this.dateInput : "";
      const time = this.timeInput ? this.timeInput : "";
      this.$store.commit("addItem", {
        item: {
          id: +this.$store.state.itemsCounter,
          task: this.taskInput,
          deadline: date || time ? `${date} ${time}` : false,
          priority: this.priorityInput,
          isCompleted: false,
        },
      });
      this.$router.push("/list");
    },
  },
};
</script>
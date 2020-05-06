<template>
  <b-container>
    <b-row no-gutters align-v="center">
      <b-col class="my-5">
        <input
          type="text"
          name="title"
          v-model="title"
          placeholder="Enter title..."
          class="title-input"
        />
      </b-col>
      <b-col lg="3" class="text-right my-5">
        <b-button pill variant="outline-secondary">
          <span>Cancel</span>
        </b-button>
        <b-button pill variant="outline-success">
          <font-awesome-icon icon="save" class="mr-2" />
          <span>Save</span>
        </b-button>
      </b-col>
      <b-col cols="12"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
.title-input {
  font-size: 2.5rem;
  font-weight: bolder;
  outline: 0;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #ffffff;
  width: 100%;
}

.title-input:hover,
.title-input:focus,
.title-input:active {
  border-color: black;
}
</style>
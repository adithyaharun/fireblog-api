<template>
  <b-container>
    <b-row no-gutters align-v="center">
      <b-col class="my-5">
        <h1>
          <strong>Posts</strong>
        </h1>
      </b-col>
      <b-col class="text-right my-5">
        <b-button pill variant="outline-success" @click="openSearch">
          <font-awesome-icon icon="search" class="mr-2" />
          <span>Search</span>
        </b-button>
        <b-button pill variant="outline-primary" @click="openForm">
          <font-awesome-icon icon="plus" class="mr-2" />
          <span>Add New Post</span>
        </b-button>
      </b-col>
      <b-col cols="12">
        <post-table />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PostTable from "@/components/Post/Table";

export default {
  methods: {
    openForm() {
      this.$router.push({ path: "/post/create" });
    }
  },
  components: {
    "post-table": PostTable
  }
};
</script>

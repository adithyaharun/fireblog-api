<template>
  <b-card no-body border-variant="white" class="posts-card">
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      fields: ["title", { key: "action", label: "" }],
      items: []
    };
  }
};
</script>

<style>
.table th {
  border-top: 0;
}
.table thead th {
  border-bottom-width: 1px;
}
.posts-card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
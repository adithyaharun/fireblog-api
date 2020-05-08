<template>
  <b-container>
    <b-row no-gutters align-v="center">
      <b-col class="my-5">
        <h1>
          <strong>Posts</strong>
        </h1>
      </b-col>
      <b-col class="text-right my-5">
        <b-button pill variant="outline-secondary" @click="openSearch">
          <font-awesome-icon icon="search" class="mr-1" />
          <span>Search</span>
        </b-button>
        <b-button pill variant="outline-secondary" @click="$router.push({ name: 'post-form' })">
          <font-awesome-icon icon="plus" class="mr-1" />
          <span>Add New Post</span>
        </b-button>
      </b-col>
      <b-col cols="12">
        <b-table striped hover :busy.sync="loading" :items="posts" :fields="fields">
          <template v-slot:cell(title)="data">
            <nuxt-link
              :to="{
                name: 'post-form',
                query: {
                  id: data.item.id,
                  state: 'edit'
                },
                params: { data: data.item }
              }"
            >{{ data.item.title }}</nuxt-link>
          </template>
          <template v-slot:cell(status)="data">
            <b-badge :variant="formatStatus(data.item.status)">{{ data.item.status.toUpperCase() }}</b-badge>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      fields: [
        "title",
        {
          key: "createdAt",
          label: "Published At",
          thAttr: { width: 150 },
          formatter: (value, key, item) =>
            value ? moment(value).format("DD MMM YYYY") : "-"
        },
        {
          key: "status",
          label: "Status",
          thAttr: { width: 120 }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      posts: state => state.post.all,
      loading: state => state.post.loading
    })
  },
  mounted() {
    this.getPost();
  },
  methods: {
    ...mapActions({ getPost: "post/get" }),
    openSearch() {},
    formatStatus(status) {
      switch (status) {
        case "published":
          return "success";
          break;

        case "trash":
          return "danger";
          break;

        default:
          return "secondary";
          break;
      }
    }
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
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
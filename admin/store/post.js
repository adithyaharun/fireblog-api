export const state = () => ({
  all: [],
  page: 1,
  limit: 25,
  loading: false,
  maxed: true
});

export const mutations = {
  store(state, posts) {
    state.all = posts;
  },
  toggleLoading(state, flag) {
    state.loading = flag;
  },
  setMaxReached: (state, maxed) => state.maxed = maxed
};

export const actions = {
  async get({ commit, state }) {
    commit('toggleLoading', true);

    try {
      const { data } = await this.$axios.get('/post');

      commit('store', data);
      commit('setMaxReached', (data.length < state.limit));
    } catch (error) {
      console.log(error);
    }

    commit('toggleLoading', false);
  },
  async find({ commit, state }, id) {
    commit('toggleLoading', true);

    try {
      const { data } = await this.$axios.get(`/post/${id}`);

      return data;
    } catch (error) {
      console.log(error);
    }

    commit('toggleLoading', false);
  }
};
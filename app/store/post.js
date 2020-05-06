export const state = () => ({
  all: [],
  page: 1,
  limit: 10,
  loading: false,
  maxed: true
});

export const mutations = {
  store(state, post) {
    state.all.push(post);
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

      data.forEach(post => {
        commit('store', post);
      });

      commit('setMaxReached', (data.length < state.limit));
    } catch (error) {
      console.log(error);
    }

    commit('toggleLoading', false);
  }
};
const siteURL = "https://www.atelierstudios.com/";

export const state = () => ({
  posts: [],
  tags: [],
  categories: [],
});

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts;
  },
  updateTags: (state, tags) => {
    state.tags = tags;
  },
  updateCats: (state, categories) => {
    state.categories = categories;
  },
};

export const actions = {
  async getPosts({ state, commit, dispatch }) {
    if (state.posts.length) return;

    try {
      let posts = await fetch(`${siteURL}/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`).then((res) => res.json());

      posts = posts
        .filter((el) => el.status === "publish" && el.id != 2683)
        .map(({ id, slug, title, excerpt, date, tags, categories, _embedded, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          categories,
          _embedded,
          content,
        }));

      commit("updatePosts", posts);
    } catch (err) {
      console.log(err);
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return;

    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags);
    }, []);
    allTags = allTags.join();

    try {
      let tags = await fetch(`${siteURL}/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`).then((res) =>
        res.json()
      );

      tags = tags.map(({ id, name }) => ({
        id,
        name,
      }));

      commit("updateTags", tags);
    } catch (err) {
      console.log(err);
    }
  },
  async getCats({ state, commit }) {
    if (state.categories.length) return;

    let allCats = state.posts.reduce((acc, item) => {
      return acc.concat(item.categories);
    }, []);
    allCats = allCats.join();

    try {
      let categories = await fetch(
        `${siteURL}/wp-json/wp/v2/categories?page=1&per_page=40&include=${allCats}`
      ).then((res) => res.json());

      categories = categories.map(({ id, name }) => ({
        id,
        name,
      }));

      commit("updateCats", categories);
    } catch (err) {
      console.log(err);
    }
  },
};

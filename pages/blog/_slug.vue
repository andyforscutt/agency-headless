<template>
  <main class="post individual">
    <div class="img">
      <img
        class="featured-img"
        :src="post._embedded['wp:featuredmedia']['0'].source_url"
        width="100%"
        :alt="post.title.rendered"
      />
    </div>
    <h1 v-html="post.title.rendered">{{ post.title.rendered }}</h1>
    <small class="date">{{ post.date | dateformat }}</small>
    <section v-html="post.content.rendered"></section>

    <nuxt-link to="/" class="readmore slide">⟵ Back</nuxt-link>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: this.post.title.rendered,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    post() {
      return this.posts.find((el) => el.slug === this.slug);
    },
  },
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    goBack() {
      window.history.back();
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
main.post {
  margin: 60px auto 50px;
  max-width: 800px;
  padding: 0 30px 70px;
}

.featured-img {
  margin-bottom: 15px;
}

h1 {
  color: black;
  font-size: 40px;
}

section {
  color: #444;
}

.date {
  text-align: center;
}

a,
a:active,
a:visited {
  text-decoration: none;
  color: black;
}

.active {
  border: 1px solid #d44119;
  background-color: #fae091 !important;
}

.slide {
  position: relative;
  background: transparent;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
  z-index: 1;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &:hover:before {
    right: -1px;
  }
}

.slide::before {
  content: "";
  display: block;
  position: absolute;
  background: #000;
  transition: right 0.3s ease;
  z-index: -1;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: 108%;
  backface-visibility: hidden;
}
</style>

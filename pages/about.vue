<template>
  <div class="about">
    <h1>About</h1>
    <p>
      This is a demo of a <strong>Headless WordPress</strong> website which makes use of the WordPress
      <strong>REST API</strong> to pull in blog posts from the Atelier website.
    </p>

    <p>
      <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a> and
      <a href="https://vuejs.org/" target="_blank">Vue.js</a> handle the front-end, with Nuxt generating static HTML
      pages content, which is great for performance, SEO and security.
    </p>

    <p>
      You can edit your WordPress content as normal in a seperate Admin area. Posting content can trigger a rebuild of
      the static content so your Front-end is always up to date, but turbo charged for performance!
    </p>

    <p>To find out more, I would love to talk about it.</p>

    <p class="sig">Andy</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about {
  margin: 30px auto 50px;
  max-width: 800px;
  padding: 50px 50px 70px;
  background: white;
}

p {
  margin: 15px 0 20px;
}

.sig {
  font-size: 2rem;
  font-style: italic;
  font-weight: 600;
}
</style>

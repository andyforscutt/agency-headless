<template>
  <div>
    <app-masthead></app-masthead>

    <div class="posts">
      <main>
        <h2>BLOG</h2>

        <div class="blog" v-for="post in sortedPosts" :key="post.id">
          <div class="img">
            <img
              class="post-thumb"
              :src="post._embedded['wp:featuredmedia']['0'].source_url"
              width="100%"
              :alt="post.title.rendered"
            />
          </div>

          <div class="blog-name">
            <h3>
              <a :href="`blog/${post.slug}`" v-html="post.title.rendered">{{ post.title.rendered }}</a>
            </h3>

            <div class="details">
              <div v-html="post.excerpt.rendered"></div>

              <p class="date">
                <small>{{ post.date | dateformat }}</small>
              </p>

              <a :href="`blog/${post.slug}`" class="readmore slide">Read more ⟶</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppMasthead from "@/components/AppMasthead.vue";

export default {
  components: {
    AppMasthead,
  },
  data() {
    return {
      selectedTag: null,
      selectedCat: null,
      activeClass: "active",
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    tags() {
      return this.$store.state.tags;
    },
    cats() {
      return this.$store.state.cats;
    },
    // sortedPosts() {
    //   if (!this.selectedTag) return this.posts;
    //   return this.posts.filter(el => el.tags.includes(this.selectedTag));
    // }
    sortedPosts() {
      if (!this.selectedCat) return this.posts;
      return this.posts.filter((el) => el.cats.includes(this.selectedCat));
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  // methods: {
  //   updateTag(tag) {
  //     if (!this.selectedTag) {
  //       this.selectedTag = tag.id;
  //     } else {
  //       this.selectedTag = null;
  //     }
  //   }
  // }
  methods: {
    updateCat(cat) {
      if (!this.selectedCat) {
        this.selectedCat = cat.id;
      } else {
        this.selectedCat = null;
      }
    },
  },
};
</script>

<style lang="scss">
.blog {
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 7px 29px 0px rgba(69, 69, 69, 0.3);
  margin: 30px;

  @media (min-width: 1600px) {
    flex-direction: row;
  }
}

p {
  font-size: 17px;
}

.img {
  height: 100%;
  width: 100%;

  @media (min-width: 1600px) {
    width: 50%;
  }
}

.blog-name {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  padding: 15px 30px;

  @media (min-width: 1600px) {
    width: 50%;
  }
}

.details {
  width: 100%;
}

.posts {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 6vw;
  margin: 5em auto;
  max-width: 80vw;

  @media (max-width: 800px) {
    display: block;
  }
}

main {
  grid-area: 1 / 1 / 2 / 2;
  margin-bottom: 30px;
}

aside {
  grid-area: 1 / 2 / 2 / 3;
}

h2 {
  margin-bottom: 2em;
}

h3 a,
h3 a:active,
h3 a:visited {
  color: #b81f5f;
  font-weight: 600;

  &:hover,
  &:focus {
    color: #1468a0;
  }
}

a,
a:active,
a:visited {
  text-decoration: none;
  color: black;
}

a.excerpt-read-more {
  display: none;
}

.tags-title {
  background-color: #000;
  color: #fff;
  border: none;
  text-transform: capitalize;
  letter-spacing: 0;
  font-size: 1.2rem;
  padding: 15px;
  margin: 0 35px;
  position: relative;
  top: -25px;
}

.tags-list {
  background: #f5f5f5;
  padding: 70px 25px 25px;
  margin-top: -65px;
}

.post {
  border-bottom: 1px solid rgb(223, 222, 222);
  margin-bottom: 2em;
  padding-bottom: 2em;
  color: #444;

  h3 {
    margin-bottom: 0.5em;
    font-size: 26px;
  }
}

.tags-list ul {
  padding-left: 0;
}

// .tags-list li {
//   font-family: "Open Sans", serif;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   padding: 6px 15px;
//   margin: 0 0 10px 10px;
//   display: inline-block;
//   font-size: 0.7rem !important;
//   border: 1px solid #000;
//   transition: all 0.3s;
//   outline: none;
//   font-weight: normal;
//   cursor: pointer;
//   background: #fff;
//   a {
//     color: #000;
//   }
// }

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

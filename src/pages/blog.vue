<template>
  <page-theme v-if="Object.keys(post).length">
    <template #c_title>
      <div class="blog_t w-100 flex-column justify-center align-center">
        <h1>{{post.title}}</h1>

        <div class="other_item flex align-center">
          <div class="time">
            <faIcon class="faicon" :icon="icon"></faIcon>
            <span>
              Posted on {{$root.format_time(post.createdAt, "YYYY-MM-dd")}}
            </span>
          </div>
          <span>|</span>
          <div class="tags flex align-center">
            <faIcon :icon="['fas', 'tags']"></faIcon>
            <ul class="c_ul m-1 flex">
              <li v-for="tag in post.tags" :key="tag">
                <tag-btn :name="tag.name" :col="tag.color"></tag-btn>
              </li>
            </ul>
          </div>
          <span>|</span>
          <div class="comments flex align-center">
            <faIcon :icon="['fas', 'comments']"></faIcon>
            <span class="m-1">{{post.comments?.length ?? 0}}</span>
          </div>
          <div class="viewcount flex align-center">
            <faIcon :icon="['fas', 'eye']"></faIcon>
            <span class="m-1">{{post.viewCount ?? 0}}</span>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div class="content" v-html="$root.markedContent(post.content)"></div>
      <div class="discuss">
        <div class="discuss_header">
          <span>{{post.comments.length}}</span>条评论
          <div class="c-divider c-divider-horizontal"></div>
        </div>
        <div class="send_comment">

        </div>
        <div class="comments">
          <div class="comment-inner"></div>
        </div>
      </div>
    </template>
  </page-theme>
</template>

<script>
import pageTheme from "../components/pageTheme";
import { axiosReq } from "../plugins/axios";
import tagBtn from "../components/Buttons/tagBtn";

export default {
  components: {
    pageTheme,
    tagBtn
  },
  data() {
    return {
      post: {},
      icon: this.$router.currentRoute.value.meta.icon
    }
  },
  beforeCreate() {
    axiosReq({
      methods: 'get',
      url: `/posts/${this.$route.query?.id ?? 0}?view=1`
    }).then((res) => {
      this.post = res.data
    }).catch((err) => {
      this.$root.openNotifi(false, err)
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .blog_t {
    > h1 {
      margin-bottom: 1rem;
    }

    .other_item {
      justify-content: space-around;

      > * {
        padding: 0 8px;
      }
    }
  }

  .content {
    margin: 0 10px;
  }
</style>
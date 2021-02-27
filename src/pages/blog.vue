<template>
  <page-theme>
    <template #title>
      <span>{{$root.format_time(this.post.createdAt, "YYYY-MM-dd HH:mm")}}</span>
      <h1>{{this.post.title}}</h1>
    </template>
    <template #body>
      <div v-html="$root.markedContent(this.post?.content ?? '')"></div>
    </template>
  </page-theme>
</template>

<script>
import pageTheme from "../components/pageTheme";
import { axiosReq } from "../plugins/axios";

export default {
  components: {
    pageTheme,
  },
  data() {
    return {
      post: {}
    }
  },
  mounted() {
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

<style>

</style>
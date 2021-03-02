<template>
  <div class="comment_inner">
    <div class="comment_avatar">
      <img v-if="state.isLogged" :src="user.avatar">
      <faIcon v-else :icon="['fab', 'github']" size='2x'></faIcon>
    </div>
    <div class="comment_content">
      <div class="comment_content_author">
        <slot name="content_author">
          <span class="author_name"></span>
          <span class="author_time"></span>
        </slot>
      </div>

      <div class="comment_content_detail">
        <slot name="content_detail">
          <div class="article_detail">
            
          </div>
        </slot>
      </div>

      <ul class="c_ul comment_actions">
        <!-- <li></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: this.$store.state
    }
  }
}
</script>

<style>

</style>
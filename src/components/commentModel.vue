<template>
  <div class="comment_inner">
    <div class="comment_avatar">
      <!-- <img v-if="state.isLogged" :src="state.user.avatar">
      <faIcon v-else :icon="['fab', 'github']" size='2x'></faIcon> -->
      <panel-presonal :options="{
        name: 'Test',
        nameShow: false,
        nameAvatar: true,
        color: '#ffffff',
        vertical: false,
        l_h: true,
      }"></panel-presonal>
    </div>
    <div class="comment_content">
      <div class="comment_content_author">
        <slot name="content_author">
          <span class="author_name">
            {{model.userId}}
          </span>
          <span class="author_time" v-if="model.createdAt">
            {{$root.format_time(model.createdAt, "YYYY-mm-dd")}}
          </span>
        </slot>
      </div>

      <div class="comment_content_detail">
        <slot name="content_detail">
          <div class="article_detail">
            {{model.content}}
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
import panelPresonal from "./panelPresonal";

export default {
  components: {
    panelPresonal,
  },
  props: {
    model: {
      type: Object,
      default() {
        return {
          content: ''
        }
      }
    }
  },
  data() {
    return {
      state: this.$store.state
    }
  }
}
</script>

<style>

</style>
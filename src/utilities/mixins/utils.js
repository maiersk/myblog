import marked from "marked";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  methods: {
    markedContent(str) {
      return marked(str)
    },
    format_time(str_time, fmt) {
      return dayjs(str_time).format(fmt)
    },
    fromNow(str_time) {
      dayjs.extend(relativeTime)
      return dayjs(str_time).fromNow()
    }
  }
}
import marked from "marked";

export default {
  methods: {
    markedContent(str) {
      return marked(str)
    },
    format_time(str_time, fmt) {
      const date = new Date(str_time)
      const o = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
      }

      let ret
      for (let k in o) {
        ret = new RegExp(`(${k})`).exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (o[k]) : (o[k].padStart(ret[1].length, "0")))
        }
      }
      return fmt
    }
  }
}
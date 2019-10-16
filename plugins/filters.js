import Vue from "vue";
import dayjs from "dayjs";

// 本文のトリミング
Vue.filter("description", function(value) {
    if (value) {
      return value.slice(0, 100) + "...";
    }
  })
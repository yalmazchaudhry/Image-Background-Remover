import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    Image: "",
  },

  actions: {
    getImage(context, img) {
      fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "swHx4MLvHdbMJGGMRfjZq757",
        },
        body: JSON.stringify({
          image_file_b64: img,
        }),
        responseType: "arrayBuffer",
      })
        .then((res) => res.arrayBuffer())
        .then((data) => {
          console.log(data);
          const base64String = btoa(
            [].reduce.call(
              new Uint8Array(data),
              function (p, c) {
                return p + String.fromCharCode(c);
              },
              ""
            )
          );
          var extended = "data:image/jpg;base64," + base64String;

          // console.log(base64String)
          context.commit("getImage", extended);
        });
    },
  },
  mutations: {
    getImage(state, extended) {
      state.Image = extended;
    },
  },
  //   getters: {
  //     getImage() {
  //       return store.state.Image;
  //     },
  //   },
});

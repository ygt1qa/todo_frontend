import axios from "axios";

const BASE_URL = "http://localhost:8000/v1/"

export default {
    async getItems({ commit }, payload) {
        commit("showLoading");
        const response = await axios
            .get(`${BASE_URL}tasks`, {
                headers: { "Content-Type": "application/json" },
                params: {},
                timeout: 15000
            })
            .catch(error => {
                // エラー処理
                console.error(error);
                commit("hideLoading");
                this.$router.push("/error");
            });
        commit("setItems", response.data);
        commit("hideLoading");
    }
};
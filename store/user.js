export const state = () => {
    return {
        userInfo: {}
    }
}
export const mutations = {
    setUserInfo(state, data){
        state.userInfo =  data;
    }
}

export const actions = {
    async login(store, data){
        var res = await this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        })

        if(res.status === 200){
            store.commit("setUserInfo", res.data);
        }

        return res;
    },

    async sendCaptcha(store, tel){
        const res = await this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel 
            }
        });

        return res;
    }
}
import Api from './../../../api/auth'

export default {

    registerUser({ commit }, data) {
        return new Promise((resolve, reject) => {
            Api.create(data).then(res => {
                let token = res.data.token;
                localStorage.setItem('token', token)
                commit("retrieveToken", token)
                resolve(res)
            }).catch(err => {
                reject(err)

            })
        })
    },


    submitPin({ commit, state,rootState }, data) {

        return new Promise((resolve, reject) => {
            Api.checkPin(data, state).then(res => {
                let pinToken = res.data.pinToken;
                let token = res.data.token;
                localStorage.setItem('pinToken', pinToken);
                localStorage.setItem('token', token)
                commit("retrievePinToken", pinToken)
                commit("retrieveToken",{token,user:res.data.user,root:rootState})

                resolve(res)
            }).catch(err => {
                reject(err)

            })
        })
    },


    loginUser({commit,rootState}, data) {
        return new Promise((resolve, reject) => {
            Api.login(data).then(res => {
                let token = res.data.token;
                localStorage.setItem('token', token)
                commit("retrieveToken", {token,user:res.data.user,root:rootState})
                resolve(res)
            }).catch(err => {
                reject(err)

            })
        })
    },


    destroyToken({getters,commit,rootState}){
        if (getters.loggedIn) {
            return new Promise((resolve)=>{
                    localStorage.removeItem('token')
                    localStorage.removeItem('pinToken')
                    commit("destroyToken",rootState)
                    resolve(true)
                })
                .catch(err=>{
                    console.log(err);
                    
                })
        }
    },




}
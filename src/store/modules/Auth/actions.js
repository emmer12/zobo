import Api from './../../../api/auth'

export default {

    registerUser({ commit,rootState }, data) {
        return new Promise((resolve, reject) => {
            Api.create(data).then(res => {
                let token = res.data.token;
                localStorage.setItem('token', token)
                localStorage.setItem('role', res.data.user.role)
                commit("retrieveToken", {token,user:res.data.user,root:rootState})
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
                localStorage.setItem('role', res.data.user.role)
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
                localStorage.setItem('role', res.data.user.role)
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
                    localStorage.removeItem('role')
                    commit("destroyToken",rootState)
                    resolve(true)
                })
                .catch(err=>{
                    console.log(err);
                    
                })
        }
    },

    destroyPinToken({getters,commit,rootState}){
        if (getters.loggedIn) {
            return new Promise((resolve)=>{
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken",rootState)
                    resolve(true)
                })
                .catch(err=>{
                    console.log(err);
                    
                })
        }
    },


    resetPasswordRequest({commit},data) {
        return new Promise((resolve, reject) => {
            Api.passwordRequest(data).then(res => {
                resolve(res)
                commit('')``
            }).catch(err => {
                reject(err)

            })
        })
    },



}
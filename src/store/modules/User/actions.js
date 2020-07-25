import Api from './../../../api/user'

export default {
    getUserByUsername({commit },username) {
        return new Promise((resolve, reject) => {
            Api.getUserByUsername(username).then(res => {
                
               commit('setUserPro',res.data.user)
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },
    getUser({rootState,commit }) {
        return new Promise((resolve, reject) => {
            Api.getUser(rootState).then(res => {
               commit('setUser',res.data.user)
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },

    updateUser({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            Api.update(rootState,data).then(res => {
               commit('setUser',res.data.user)
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },

    getFollow({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            let rData=data ? data : { uid:null} 
            Api.getFollow(rootState,rData).then(res => {
               commit('setFollow',res.data)
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },


    follow({rootState,commit},data) {
        return new Promise((resolve, reject) => {
            Api.follow(rootState,data).then(res => {
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },


    unfollow({rootState,commit},data) {
        return new Promise((resolve, reject) => {
            Api.unfollow(rootState,data).then(res => {
               resolve(res)
            }).catch(err => {
                if (err.response.data.error && err.response.data.name==='TokenExpiredError') {
                    localStorage.removeItem('pinToken')
                    commit("destroyPinToken")
                }
                reject(err)

            })
        })
    },

}

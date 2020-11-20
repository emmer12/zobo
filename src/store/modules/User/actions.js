import Api from './../../../api/user'

export default {
    getUserByUsername({commit },username) {
        return new Promise((resolve, reject) => {
            Api.getUserByUsername(username).then(res => {
               commit('setUserPro',res.data)
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
    getUser({commit }) {
        return new Promise((resolve, reject) => {
            Api.getUser().then(res => {
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
    searchUsers({commit },data) {
        return new Promise((resolve, reject) => {
            Api.getUser(data).then(res => {
               commit('searchUsers',res.data.celebs)
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

    getCurrency({commit }) {
        return new Promise((resolve, reject) => {
            Api.getCurrency().then(res => {
               commit('setCurrencies',res.data.currency)
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


    setCurrency({commit},data) {
        return new Promise((resolve, reject) => {
            Api.setCurrency(data).then(res => {
            //    commit('setCurrency',res.data.currency)
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

    updateUser({commit },data) {
        return new Promise((resolve, reject) => {
            Api.update(data).then(res => {
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

    getOtherUsers({commit }) {
        return new Promise((resolve, reject) => {
            Api.getOtherUser().then(res => {
               commit('setOtherUser',res.data.users)
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

    getFollow({commit }) {
        return new Promise((resolve, reject) => {
            Api.getFollow().then(res => {
            //    commit('setFollow',res.data)
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
    getProfileFollow({commit },data) {
        return new Promise((resolve, reject) => {
            Api.getProfileFollow(data).then(res => {
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

    follow({commit},data) {
        return new Promise((resolve, reject) => {
            Api.follow(data).then(res => {
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


    unfollow({commit},data) {
        return new Promise((resolve, reject) => {
            Api.unfollow(data).then(res => {
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

    sendEmail() {
        return new Promise((resolve) => {
            Api.sendEmail().then(res => {
               resolve(res)
            }).catch(err => {
              console.log('====================================');
              console.log(err);
              console.log('====================================');
            })
        })
        
    },

    addSpecial(undefind,data) {
        return new Promise((resolve, reject) => {
            Api.addSpecial(data).then(res => {
               resolve(res)
            }).catch(err => {
                reject(err)

            })
        })
    },

    deleteSp({commit },data) {
        return new Promise((resolve, reject) => {
            Api.deleteSp(data).then(res => {
            commit('deleteSp',data)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },


}

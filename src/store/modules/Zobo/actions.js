import Api from './../../../api/zobo'

export default {

    getZoboCat({ commit}) {
        return new Promise((resolve, reject) => {
            Api.getZoboCat().then(res => {
               commit('setZoboCat',res.data.zobos)
               resolve(res.data.zobos)
            }).catch(err => {
                reject(err)

            })
        })
    },

    getMyZobo({ commit }) {
        return new Promise((resolve, reject) => {
            Api.getMyZobo().then(res => {
               commit('setMyZobo',res.data.zobos)
               resolve(res.data.zobos)
            }).catch(err => {
                reject(err)

            })
        })
    },

    createZobo({commit },data) {
        return new Promise((resolve, reject) => {
            Api.create(data,).then(res => {
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
    
    updateZobo({commit },data) {
        return new Promise((resolve, reject) => {
            Api.update(data,).then(res => {
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


      makePayment({commit },data) {
        return new Promise((resolve, reject) => {
            Api.pay(data,).then(res => {
               localStorage.removeItem('zobo')
               localStorage.removeItem('init')
            //    dispatch('sendNotification',{
            //        type:'payment',
            //        receiver:data.
            //    })
               commit('destroyPay') 
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

    withdraw({commit },data) {
        return new Promise((resolve, reject) => {
            Api.withdraw(data,).then(res => {
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

    uploadFile({commit},data){
        return new Promise((resolve,reject)=>{                
            let formData=new FormData();
            formData.append('file',data);
            Api.upload(formData,commit)         
            .then(response=>{           
                resolve(response)
            })
            .catch(err=>{
                console.log("fail"); 
                reject(err)
            })
        })
    },
    getZoboDetails({commit },data) {
        return new Promise((resolve, reject) => {
            Api.getId(data,).then(res => {
               commit("setDetails",res.data.zobo);
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
    getZoboDetailsVisitor({commit },data) {
        return new Promise((resolve, reject) => {
            Api.getIdVisitor(data).then(res => {
               commit("setDetails",res.data.zobo);
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

    getZoboSlug({commit },data) {
        return new Promise((resolve, reject) => {
            Api.getId(data).then(res => {
               
                commit("setDetails",res.data.zobo)
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


    deleteZobo({commit},data) {
        return new Promise((resolve, reject) => {
            Api.remove(data).then(res => {
               resolve(res.data)
               commit('removeZobo',data)
            }).catch(err => {
                reject(err)

            })
        })
    },

    getTransactions({commit}) {
        return new Promise((resolve, reject) => {
            Api.getTrans().then(res => {
               resolve(res.data)
               commit('setTransaction',res.data.transactions)
            }).catch(err => {
                reject(err)
            })
        })
    },


    getYield({commit},data) {
        return new Promise((resolve, reject) => {
            Api.getYield(data).then(res => {
               resolve(res.data)
               commit('setYield',res.data.yielded)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getFeeds({commit},data) {
        return new Promise((resolve, reject) => {
            Api.getFeeds(data).then(res => {
               resolve(res.data)
               commit('setFeeds',res.data.feeds)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getCelepLimit({commit}) {
        return new Promise((resolve, reject) => {
            Api.getCelepLimit().then(res => {
               resolve(res.data)
               commit('getCelepLimit',res.data.celep)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getCelepAll({commit}) {
        return new Promise((resolve, reject) => {
            Api.getYield().then(res => {
               resolve(res.data.celep)
               commit('getCelepAll',res.data.celep)
            }).catch(err => {
                reject(err)
            })
        })
    },


    setZoboVal({commit},val){
        commit('setZoboVal',val)
    }

}

import Api from './../../../api/zobo'

export default {

    getZoboCat({ commit,rootState }) {
        return new Promise((resolve, reject) => {
            Api.getZoboCat(rootState).then(res => {
               commit('setZoboCat',res.data.zobos)
               resolve(res.data.zobos)
            }).catch(err => {
                reject(err)

            })
        })
    },

    getMyZobo({ commit,rootState }) {
        return new Promise((resolve, reject) => {
            Api.getMyZobo(rootState).then(res => {
               commit('setMyZobo',res.data.zobos)
               resolve(res.data.zobos)
            }).catch(err => {
                reject(err)

            })
        })
    },

    createZobo({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            Api.create(data,rootState).then(res => {
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


      makePayment({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            Api.pay(data,rootState).then(res => {
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

    withdraw({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            Api.withdraw(data,rootState).then(res => {
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

    uploadFile({rootState,commit},data){
        return new Promise((resolve,reject)=>{                
            let formData=new FormData();
            formData.append('file',data);
            Api.upload(formData,rootState,commit)         
            .then(response=>{           
                resolve(response)
            })
            .catch(err=>{
                console.log("fail"); 
                reject(err)
            })
        })
    },
    getZoboDetails({rootState,commit },data) {
        return new Promise((resolve, reject) => {
            Api.getId(data,rootState).then(res => {
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


    deleteZobo({commit,rootState},data) {
        return new Promise((resolve, reject) => {
            Api.remove(rootState,data).then(res => {
               resolve(res.data)
               commit('removeZobo',data)
            }).catch(err => {
                reject(err)

            })
        })
    },

    getTransactions({commit,rootState}) {
        return new Promise((resolve, reject) => {
            Api.getTrans(rootState).then(res => {
               resolve(res.data)
               commit('setTransaction',res.data.transactions)
            }).catch(err => {
                reject(err)
            })
        })
    },


    getYield({commit,rootState},data) {
        return new Promise((resolve, reject) => {
            Api.getYield(rootState,data).then(res => {
               resolve(res.data)
               commit('setYield',res.data.yielded)
            }).catch(err => {
                reject(err)
            })
        })
    },


    setZoboVal({commit},val){
        commit('setZoboVal',val)
    }

}

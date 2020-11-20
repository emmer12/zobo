import Api from './../api/notification'

export default {
    getNotifications({ commit}) {
        return new Promise((resolve, reject) => {
            Api.get().then(res => {
               commit('setNotifiction',res.data.notifications)
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
    getAlltNotifications({ commit}) {
        return new Promise((resolve, reject) => {
            Api.getAll().then(res => {
               commit('setAllNotifiction',res.data.notifications)
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
    markAsRead() {
        return new Promise((resolve, reject) => {
            Api.markAsRead().then(res => {
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
      
}
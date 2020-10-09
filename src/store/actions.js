import Api from './../api/notification'

export default {
    getNotifications({ commit,state}) {
        return new Promise((resolve, reject) => {
            Api.get(state).then(res => {
               commit('setNotifiction',res.data.notifications)
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
    getAlltNotifications({ commit,state}) {
        return new Promise((resolve, reject) => {
            Api.getAll(state).then(res => {
               commit('setAllNotifiction',res.data.notifications)
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
    markAsRead({state}) {
        return new Promise((resolve, reject) => {
            Api.markAsRead(state).then(res => {
               resolve(res.data)
            }).catch(err => {
                reject(err)

            })
        })
    },
      
}
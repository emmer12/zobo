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
      
}
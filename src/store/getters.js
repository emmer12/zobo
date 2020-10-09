export default {
    notifications(state){
        return state.notifications
    },
     allNotifications(state){
        return state.allNotifications
    },
    notificationsCount(state){
        return state.notifications.length || 0
    }
}
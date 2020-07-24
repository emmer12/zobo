export default {
    notifications(state){
        return state.notifications
    },
    notificationsCount(state){
        return state.notifications.length || 0
    }
}
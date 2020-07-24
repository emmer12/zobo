export default {
    loggedIn(state){
        return state.token 
    },

    authToken(state){
        return state.pinToken 
    },


    category(state){
        return state.category
    }
}
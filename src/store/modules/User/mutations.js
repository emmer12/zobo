    export default {
            setUser(state,data){
                state.user=data;
            },
            setUserPro(state,data){
                state.profile=data;
            },
            setFollow(state,data){
                state.user.follower=data.follower
                state.user.following=data.following
            }
    }

    
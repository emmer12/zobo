    export default {
            setUser(state,data){
                state.user=data;
            },
            setUserPro(state,data){
                state.profile=data;
            },
            setCurrencies(state,data){
                state.currencies=data
            },
            deleteSp(state,data){
               state.user.special=state.user.special.filter(sp=>sp._id!== data)
            },
            setOtherUser(state,data){
                state.otherUsers=data
            },
            setCeleb(state,data){
                state.celeb=data
            }
    }

    
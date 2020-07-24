    export default {
            getCategory(state,data){
                state.category=data;
            },

            deletePost(state,data){
                data.map(id=>{
                    let index=state.userPosts.findIndex(item=>item._id == id)
                    state.userPosts.splice(index,1)
                })
            },

            retrieveToken(state,{token,root,user}){
                state.token=token
                root.user.user=user
            
            },
            
            retrievePinToken(state,data){
                state.pinToken=data
            },
        
        
            loading(state,data){
                state.loading=data
            },

            destroyToken(state,rootState){
                state.token=null
                state.pinToken=null
                rootState.user.user=null

            }
            

    }

    
import api from "/"

const endPoint="/user";

api.defaults.timeout=10000


const getUser=(rootState)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.get(endPoint+'/user')
}


const update=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.post(endPoint+'/update',data)
}

const follow=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.post(endPoint+'/follow',data)
}

const unfollow=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.post(endPoint+'/unfollow',data)
}


const getUserByUsername=(username)=>{
    return api.get(endPoint+'/'+username)
}

const getFollow=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.get(endPoint+'/get-follow/'+data.uid)
}


export default{
   getUser,
   update,
   getUserByUsername,
   getFollow,
   follow,
   unfollow
}
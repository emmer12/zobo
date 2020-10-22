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
    return api.get(endPoint+'/z/'+username)
}

const getFollow=(rootState)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.get(endPoint+'/get-follow')
}

const getProfileFollow=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.get(endPoint+'/get-profile-follow/'+data.uid)
}

const getCurrency=()=>{
    return api.get(endPoint+'/get-currency')
}

const setCurrency=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.patch(endPoint+'/set-currency',{data})
}


const sendEmail=(rootState)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.post(endPoint+'/send-email')
}
const addSpecial=(rootState,data)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.post(endPoint+'/add-special',data)
}


export default{
   getUser,
   update,
   getUserByUsername,
   getFollow,
   getProfileFollow,
   follow,
   unfollow,
   getCurrency,
   setCurrency,
   sendEmail,
   addSpecial
}
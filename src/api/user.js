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


const getUserByUsername=(username)=>{
    return api.get(endPoint+'/'+username)
}




export default{
   getUser,
   update,
   getUserByUsername
}
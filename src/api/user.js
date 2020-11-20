import api from "/"

const endPoint="/user";

api.defaults.timeout=10000


const getUser=()=>{
    // api.defaults.headers.common['Authorization']='Bearer ' + rootState.auth.token
    return api.get(endPoint+'/user')
}


const update=(data)=>{
    return api.post(endPoint+'/update',data)
}



const follow=(data)=>{
    return api.post(endPoint+'/follow',data)
}

const unfollow=(data)=>{
    return api.post(endPoint+'/unfollow',data)
}


const getUserByUsername=(username)=>{
    return api.get(endPoint+'/z/'+username)
}

const getFollow=()=>{
    return api.get(endPoint+'/get-follow')
}

const getProfileFollow=(data)=>{
    return api.get(endPoint+'/get-profile-follow/'+data.uid)
}

const getCurrency=()=>{
    return api.get(endPoint+'/get-currency')
}

const setCurrency=(data)=>{
    return api.patch(endPoint+'/set-currency',{data})
}


const sendEmail=()=>{
    return api.post(endPoint+'/send-email')
}
const addSpecial=(data)=>{
    return api.post(endPoint+'/add-special',data)
}
const deleteSp=(data)=>{
    return api.delete(endPoint+'/delete-special/'+data)
}
const getOtherUser=()=>{
    return api.get(endPoint+'/get-other-user')
}
const searchUsers=(data)=>{
    return api.get(endPoint+'/get-searched-user/?s='+data)
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
   addSpecial,
   deleteSp,
   getOtherUser,
   searchUsers
}
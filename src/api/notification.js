import api from "/"

const endPoint="/notification";

api.defaults.timeout=10000

const get=(state)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + state.auth.token
    return api.get(endPoint+'/get')
}

const getAll=(state)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + state.auth.token
    return api.get(endPoint+'/get-all')
}

const markAsRead=(state)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + state.auth.token
    return api.post(endPoint+'/mark-as-read')
}


export default{
    get,
    getAll,
    markAsRead
}


import api from "/"

const endPoint="/notification";

api.defaults.timeout=10000

const get=()=>{
    return api.get(endPoint+'/get')
}

const getAll=()=>{
    return api.get(endPoint+'/get-all')
}

const markAsRead=()=>{
    return api.post(endPoint+'/mark-as-read')
}


export default{
    get,
    getAll,
    markAsRead
}


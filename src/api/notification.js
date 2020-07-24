import api from "/"

const endPoint="/notification";

api.defaults.timeout=10000

const get=(state)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + state.auth.token
    return api.get(endPoint+'/get')
}


export default{
    get
}


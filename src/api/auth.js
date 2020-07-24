import api from "/"

const endPoint="/auth";

api.defaults.timeout=10000

const create=(data)=>{
    return api.post(endPoint+'/create',data)
}


const login=(data)=>{
    return api.post(endPoint+'/login',data)
}


const checkPin=(data,state)=>{
    api.defaults.headers.common['Authorization']='Bearer ' + state.token
    return api.post(endPoint+'/check-pin',data)

}


export default{
    create,
    login,
    checkPin
}
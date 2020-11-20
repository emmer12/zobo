import api from "/"

const endPoint="/auth";

api.defaults.timeout=10000

const create=(data)=>{
    return api.post(endPoint+'/create',data)
}


const login=(data)=>{
    return api.post(endPoint+'/login',data)
}


const checkPin=(data)=>{
    return api.post(endPoint+'/check-pin',data)

}


const confirmEmail=(data)=>{
    return api.get(endPoint+'/email-confirmation/'+data)
}

const passwordRequest=(data)=>{
    return api.post(endPoint+'/reset-password-request',data)

}



export default{
    create,
    login,
    checkPin,
    passwordRequest,
    confirmEmail
}
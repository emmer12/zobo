import api from "/"

const endPoint = "/zobo";

api.defaults.timeout = 10000

const create = (data, rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.post(endPoint + '/create', data)
}

const getZoboCat = (rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.get(endPoint + '/get-zobo-cat')
}
const getMyZobo = (rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.get(endPoint + '/get-my-zobos')
}

const getId = (data,rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.get(endPoint + '/get-by-id/'+data)
}

const getIdVisitor = (data) => {
    return api.get(endPoint + '/get-by-id-visitor/'+data)
}

const getSlug = (data) => {
    return api.get(endPoint + '/get-by-slug/'+data)
}


const upload = (data,rootState, commit) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.post(endPoint + '/upload-file', data, {
        onUploadProgress: progressEvent => {
            let progress = Math.round(progressEvent.loaded / progressEvent.total * 100)
            commit("uploadProgress", progress)
        }
    }
    )
}

const remove = (rootState,data) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.delete(endPoint + '/remove/'+data)
}



const pay = (data, rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.post(endPoint + '/payment', data)
}

const withdraw= (data, rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.post(endPoint + '/my/withdraw', data)
}

const getTrans=(rootState) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.get(endPoint + '/my/transactions')
}


const getYield=(rootState,data) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.token
    return api.get(endPoint + '/yielded/'+data)
}



export default {
    create,
    getZoboCat,
    getMyZobo,
    upload,
    getId,
    getSlug,
    remove,
    pay,
    getTrans,
    getIdVisitor,
    withdraw,
    getYield
}
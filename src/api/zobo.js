import api from "/"

const endPoint = "/zobo";

api.defaults.timeout = 10000

const create = (data) => {
    return api.post(endPoint + '/create', data)
}

const update = (data) => {
    return api.patch(endPoint + '/update', data)
}

const getZoboCat = () => {
    return api.get(endPoint + '/get-zobo-cat')
}
const getMyZobo = () => {
    return api.get(endPoint + '/get-my-zobos')
}

const getId = (data) => {
    return api.get(endPoint + '/get-by-id/'+data)
}

const getIdVisitor = (data) => {
    return api.get(endPoint + '/get-by-id-visitor/'+data)
}

const getSlug = (data) => {
    return api.get(endPoint + '/get-by-slug/'+data)
}


const upload = (data,commit) => {
    return api.post(endPoint + '/upload-file', data, {
        onUploadProgress: progressEvent => {
            let progress = Math.round(progressEvent.loaded / progressEvent.total * 100)
            commit("uploadProgress", progress)
        }
    }
    )
}

const remove = (data) => {
    return api.delete(endPoint + '/remove/'+data)
}



const pay = (data) => {
    return api.post(endPoint + '/payment', data)
}

const withdraw= (data) => { 
    return api.post(endPoint + '/my/withdraw', data)
}

const getTrans=() => {
    return api.get(endPoint + '/my/transactions')
}


const getYield=(data) => {
    return api.get(endPoint + '/yielded/'+data)
}


const getFeeds=() => {
    return api.get(endPoint + '/feeds')
}

const getCelepLimit=() => {
    return api.get(endPoint + '/get-celep-limit/')
}

const getCelepAll=() => {
    return api.get(endPoint + '/get-celep-all/')
}



export default {
    create,
    update,
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
    getYield,
    getCelepAll,
    getCelepLimit,
    getFeeds,
}
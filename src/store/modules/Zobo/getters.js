export default {
    zoboCat(state){
        return state.zoboCat
    },
    myZobo(state){
        return state.myZobo
    },
    zobo(state){
        return state.zobo
    },
    uploadProgress(state){
        return state.progress
    },
    giftResult(state){
        return state.zobo.min * state.gift.init
    },
    init(state){
        return state.gift.init
    },
    min(state){
        return state.zobo.min
    },
    transactions(state){
        return state.transactions
    },
    yield(state){
        return state.yield
    },
    celep(state){
        return state.celep
    },
    feeds(state){
        return state.feeds
    }
}
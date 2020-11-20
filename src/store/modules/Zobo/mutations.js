    export default {
            setZoboCat(state,data){
                state.zoboCat=data;
            },
            setMyZobo(state,data){
                state.myZobo=data;
            },

            destroyPinToken(rootState,data){
                console.log(rootState,data);
            },
            destroyPay(state){
               state.zobo=null;
            },
            uploadProgress(state,data){
                state.progress=data;
            },

            setZoboVal(state,data){
                state.gift.init=data
            },
            setDetails(state,data){
                state.zobo=data
            },
            removeZobo(state,data){
                state.myZobo=state.myZobo.filter(zobo=>zobo._id !== data)
            },
            setTransaction(state,data){
                state.transactions=data
            },
            setYield(state,data){
                state.yield=data
            },
            setFeeds(state,data){
                state.feeds=data
            },
            getCelepLimit(state,data){
                state.celep=data
            }
            

    }

    
export function resolvePromise(prms, promiseState){

    if(prms == null){
        promiseState.promise = null;
        return;
    }
    promiseState.promise = prms;
    promiseState.data = null; 
    promiseState.error = null; 

    function setPromiseDataACB(result){
        if(promiseState.promise == prms){
            promiseState.data = result; 
        }
    }
    function errorACB(error){
        if(promiseState.promise == prms){
            promiseState.error = error; 
        }
    }
    prms.then(setPromiseDataACB).catch(errorACB)
}
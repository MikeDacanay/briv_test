const tryCatchHandlr = async(promise) => {
    try{
        const data = await promise;
        return [data, null]
    }catch(err){
        console.log(err);

        return [null, err];
    }
}

module.exports = tryCatchHandlr;
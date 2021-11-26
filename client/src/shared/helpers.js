export const tryCatchHandlr = async(promise) => {
    try{
        const data = await promise;
        return [data, null]
    }catch(err){
        return [null, err];
    }
}

export const payloader = e => {
    const payload = {};

    for(const [i, el] of [...e.target].entries()){
        //to omit 'submit el' key value pair to payload
        if(i+1 === e.target.length) break;
        payload[el.name] = el.value;
    }

    return payload;
}

export const refPayloader = ({current}) => {
    const payload = {};

    for(const [i, el] of [...current].entries()){
        //to omit 'submit el' key value pair to payload
        if(i+1 === current.length) break;
        payload[el.name] = el.value;
    }

    return payload;
}
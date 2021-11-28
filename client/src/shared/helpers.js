import { reqAxios } from "./axiosConfig";

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

export const getPosts = async (setPosts) => {
    const getRequest = reqAxios
        .get(
            '/posts'
        );

    const [{data: {posts}}, getPostsError] = await tryCatchHandlr(getRequest);

    return posts ? setPosts(posts) : getPostsError;
}

export const getComments = async (setComments, post_id) => {
    const getRequest = reqAxios
        .get(
            `/comments/${post_id}`
        );

    const [{data: {comments}}, getCommentsError] = await tryCatchHandlr(getRequest);

    return comments ? setComments(comments) : getCommentsError;
}

export const querySorter = (query) => {
    query.sort((docA, docB) => {
        docA.comparableDate = getMomentVal(docA);
        docB.comparableDate = getMomentVal(docB);
        return docB.comparableDate - docA.comparableDate;
    });
}

function getMomentVal(doc){
    const {createdAt} = doc;
    const [date, time] = createdAt.split(' ');

    return (date.replace(/[^0-9]+/g, "")+time.replace(/[^0-9]+/g, ""))*1;
}
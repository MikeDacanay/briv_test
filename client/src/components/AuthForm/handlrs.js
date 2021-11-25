import axios from "axios";
import { tryCatchHandlr } from "../../shared/helpers";

export const submitHandlr = async (e, isLogin, authContxt, history) => {

    e.preventDefault();

    const request = axios
        .post(`/users/${isLogin ? 'login': 'register'}`,
            authPayload(e),
            {headers: {
                "Content-Type": "application/json",
            }}, 
        );
    const [data, error] = await tryCatchHandlr(request);

    authDataAndErrorHandlr([data, error], history, authContxt);
};

export const toggleLoginHanldr = (setIsLogin, {errLoginHandlr2}) => {
    errLoginHandlr2();
    setIsLogin((prevState) => !prevState);
};


/*** HELPERS ***/
function authPayload(e){
    const payload = {};

    for(const [i, el] of [...e.target].entries()){
        //to omit 'submit el' key value pair to payload
        if(i+1 === e.target.length) break;
        payload[el.name] = el.value;
    }

    return payload;
}

function authDataAndErrorHandlr(arr, history,  {loginHandlr, errLoginHandlr}){
    const [data, error] = arr;

    if(data) {
        loginHandlr();
        history.replace('/dashboard');
        return;
    }    
    
    // TODO create specific* login/registration error to show error message on welcome
    console.log(error);
    history.replace('/');
    errLoginHandlr();
    return;
}
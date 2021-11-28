// import axios from "axios";
import { reqAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr, payloader } from "../../shared/helpers";

export const submitHandlr = async (e, isLogin, authContxt, history) => {

    e.preventDefault();

    // const request = axios
    //     .post(`/users/${isLogin ? 'login': 'register'}`,
    //         payloader(e),
    //         {headers: {
    //             "Content-Type": "application/json",
    //         }}, 
    // );

    const request = reqAxios
        .post(`/users/${isLogin ? 'login': 'register'}`,
            payloader(e),
        );

    const [data, error] = await tryCatchHandlr(request);
            
    authDataAndErrorHandlr([data, error], history, authContxt);
};

export const toggleLoginHanldr = (setIsLogin, {errLoginHandlr2}) => {
    errLoginHandlr2();
    setIsLogin((prevState) => !prevState);
};


/*** HELPERS ***/
function authDataAndErrorHandlr(arr, history,  {loginHandlr, errLoginHandlr, displayNameHandlr}){
   
    const [data, error] = arr;

    if(data) {
        const {_id, display_name} = {...data.data.user};

        window.localStorage.clear();
        window.localStorage.setItem('userId', _id);
        loginHandlr(_id);
        window.localStorage.setItem('display_name', display_name);
        displayNameHandlr(display_name);
        window.localStorage.setItem('token', data.data.token);
        history.replace('/dashboard');
        return;
    }    
    
    // TODO create specific* login/registration error to show error message on welcome
    history.replace('/');
    errLoginHandlr();
    return error;
}
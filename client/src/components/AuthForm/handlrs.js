import axios from "axios";
import { tryCatchHandlr, payloader } from "../../shared/helpers";

export const submitHandlr = async (e, isLogin, authContxt, history) => {

    e.preventDefault();

    const request = axios
        .post(`/users/${isLogin ? 'login': 'register'}`,
            payloader(e),
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
function authDataAndErrorHandlr(arr, history,  {loginHandlr, errLoginHandlr}){
    const [{data}, error] = arr;

    if(data) {
        loginHandlr(data.user.display_name);
        localStorage.clear();
        window.localStorage.setItem('token', data.token);
        history.replace('/dashboard');
        return;
    }    
    
    // TODO create specific* login/registration error to show error message on welcome
    console.log(error);
    history.replace('/');
    errLoginHandlr();
    return;
}
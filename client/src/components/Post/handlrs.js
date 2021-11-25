import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr, payloader } from "../../shared/helpers";

export const submitHandlr = async(e) => {
    e.preventDefault();

    const request = authAxios
        .post(
            '/posts',
            payloader(e)
        );

    const [data, error] = await tryCatchHandlr(request);

    console.log(data, error);
};
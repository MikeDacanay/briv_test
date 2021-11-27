import axios from "axios";

// const baseURL = 'http://localhost:5000';

export const config = {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        "Content-Type": "application/json",
    }
};

export const authAxios = axios.create({
    // baseURL,
    // headers: {
    //     'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    //     "Content-Type": "application/json",
    // }
});

export const reqAxios = axios.create({
    // baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});
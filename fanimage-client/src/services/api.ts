import axios from "axios";

export enum HTTP_REQUEST {
    GET = "get",
    POST = "post",
    PUT = "put",
    UPDATE = "update",
    DELETE = "delete"
}

export function setTokenHeader(token: string | null) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method: HTTP_REQUEST, path: string, data: any) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        return axios[method.toLowerCase()](path, data)
            .then((res: any) => resolve(res.data))
            .catch((err: any) => {
                reject(err.response.data);
            });
    });
}

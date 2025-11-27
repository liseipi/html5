import type {UseFetchOptions} from "#app";
import type {ResponseType} from "~/model/responseType";

export const useRequest = <ResT>(url: string, opts?: UseFetchOptions<ResponseType<ResT>>) => {
    const config = useRuntimeConfig()
    const openid = useCookie('openid');

    const defaultOptions = {
        baseURL: config.public.baseURL,
        onRequest({options}: { options: any }) {
            options.headers = {
                ...options.headers,
                // Authorization: `Bearer ${accessToken}`, //测试，没有用到
            }
            options.params = {
                ...options.params,
            }
            options.query = {
                ...options.query,
                openid: openid.value
            }
            if (process.env.NODE_ENV === 'development') {
                //开发时设置默认 openid
                openid.value = 'o-WGWwvPt3UuObAMB7iJaAxt6SGY';
                options.query = {
                    ...options.query,
                    openid: openid.value,
                    debug: 1
                };
            }
        },
        onResponse({response}: { response: any }) {

        },
        onResponseError({response}: { response: any }) {

        }
    }

    return new Promise<ResponseType<ResT>>((resolve, reject) => {
        useFetch<ResponseType<ResT>>(url, Object.assign(defaultOptions, opts)) // 最好给 $fetch 也加上泛型
            .then((res) => {
                resolve(res.data.value as ResponseType<ResT>);

                //$fetch
                //resolve(res as ResponseType<ResT>);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
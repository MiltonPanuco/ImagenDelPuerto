// axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'


const baseURL = import.meta.env.VITE_APP_URL || window.location.origin

const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    },
})

// api.interceptors.request.use(config => {
//   console.log('[Axios] Method:', config.method);
//   console.log('[Axios] URL:', config.url);
//   console.log('[Axios] Data:', config.data);
//   return config;
// });

// Agrega CSRF Token automáticamente desde meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
if (csrfToken) {
  api.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

// CRUD Methods

export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, config)
}

export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config)
}

export const apiPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data, config)
}

export const apiPatch = async <T = any>(
  url: string,
  data: any = {},
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.patch<T>(url, data, config);
}

export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url, config)
}

export default api

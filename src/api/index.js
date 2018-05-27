import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';


export const requestLogin = params => { return axios.post('/user/login', params).then(res => res.data) }

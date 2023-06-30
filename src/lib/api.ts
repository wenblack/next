
import axios from 'axios'


export const api = axios.create({
    
    baseURL:'/api',
    headers:{
            Authorization:localStorage.getItem('token')
    }
})



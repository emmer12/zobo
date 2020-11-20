import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(function(config){
  const tokens = localStorage.getItem('token')
  if (tokens) {
    config.headers.Authorization=`Bearer ${tokens}`
  } else{
    config.headers.Authorization=null
  }
   return config;
  
})


export default api;

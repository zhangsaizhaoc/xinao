import axios from 'axios';
let qs = require('qs');

export function send(url, params){
  return axios.post(url, qs.stringify(params)).then((res)=>{
    return Promise.resolve(res.data);
  });
}

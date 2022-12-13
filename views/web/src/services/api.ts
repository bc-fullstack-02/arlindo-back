import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default axios.create({
  baseURL: "http://localhost:4000/v1"   
});
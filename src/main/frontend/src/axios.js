import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:8083' })
//const instance = axios.create({ baseURL: 'http://192.168.0.6:8087' })
export default instance
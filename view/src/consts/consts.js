/*require('dotenv').config({path: '../.env'});

let baseURL = process.env.BASE_URL;*/
import env from "react-dotenv"
const baseURL = env.URL;
export {baseURL};

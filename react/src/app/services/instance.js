import axios from "axios";
import { apiURL } from "../env";

const instance = axios.create({
  baseURL: apiURL,
});

export default instance;

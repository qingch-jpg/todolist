import axios from "axios";
import store from "@/store";
import { BASE_URL, TIME_OUT } from "./config";

class Request {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    this.instance.interceptors.request.use(
      (config) => {
        // store.dispatch("getTableLoading", true);
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // store.dispatch("getTableLoading", false);
        return res;
      },
      (err) => {
        // store.dispatch("getTableLoading", false);
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }
  delete(config) {
    return this.request({ ...config, method: "delete" });
  }
}

export default new Request(BASE_URL, TIME_OUT);

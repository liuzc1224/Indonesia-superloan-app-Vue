import axios from 'axios'
import store from '@/store'
import bridge from './bridge'
import {
  setToken,
} from '@/libs/util'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {}
  }
  getInsideConfig() {
    let header = {};
    // let local = window.sessionStorage.getItem("locale");
    if (
        window.sessionStorage["loginInfo"] &&
        window.sessionStorage["loginInfo"] !== "{}"
    ) {
      let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
      console.log("usrInfo");
      console.log(usrInfo);
      header["pm-uid"] = usrInfo["id"] + "";
      header["pm-token"] = usrInfo["token"];
      header["vest"] = usrInfo["vest"];
      header["Accept-Language"] = usrInfo["language"] || "in-ID";
      header["pm-appversion"] = usrInfo["appVersion"];
    } else {
      header["pm-uid"] = "57244";
      header["pm-token"] = "aeb45d99-eef4-4f85-8c4d-3e435b54e6bc";
      header["vest"] = "0";
      header["pm-appversion"] = "2.0.0";
    }
    header["Accept-Language"] = "in-ID";
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: header
    };
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // this.destroy(url)
      const {
        data,
        status
      } = res;
      return {
        data,
        status
      }
    }, error => {
      this.destroy(url);
      if (error.response.status == 401) {
        console.error('Error 401 : 登录过期');
        setToken('');
        goLogin.postMessage("goLogin");
        // bridge["goLogin"]();
      }
      addErrorLog(error.response);
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
let getAndroidVer = function() {
  var ua = navigator.userAgent.toLowerCase();
  var version = "";
  if (ua.indexOf("android") > 0) {
    var reg = /android [\d._]+/gi;
    return ua.match(reg)[0] ? ua.match(reg)[0] : "";
  }
  return version;
};
export default HttpRequest

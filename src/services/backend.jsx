import axios from 'axios';

export const apiURL = "https://projectsapi.nordicstandard.net/api";
// export const apiURL = "https://coding-challenge-fullstack-main.test/api";
export const redirectAfterLogin = "/";

const initAxios = () => {
  // console.log('initaxios', localStorage.getItem("userToken"));
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const ax = axios.create({
    baseURL: apiURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie('userToken')}`
    },
    timeout: 4000,
  });

  ax.interceptors.response.use(
    (res) => {

      return res;
    },
    (err) => {

      if(err.response.status === 401){//"Unauthenticated"
        window.location.href = '/login';
        document.cookie = "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      }

      console.log('error from interceptors', err.response);

      return Promise.reject(err);
    }
  );

  return ax;
};

export const get = (url) => {
  const axios = initAxios();
  return axios.get(url);
};

export const post = (url, params = null) => {
  const axios = initAxios();
  return axios.post(url, params);
};

export const patch = (url, params = null) => {
  const axios = initAxios();
  return axios.patch(url, params);
};

export const destroy = (url, params = null) => {
  const axios = initAxios();
  return axios.delete(url, params);
};
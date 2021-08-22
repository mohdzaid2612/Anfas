import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

import {getApiErrorMessage} from './dataHelper';
import store from '../Store';

const baseURL = 'http://ec2-3-144-72-161.us-east-2.compute.amazonaws.com/';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = store.getState().auth ? store.getState().auth.token : '';
  console.debug(token);
  if (token) {
    // authorization
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const apiWrapper = payload => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        instance(payload)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            console.debug(error.message);
            reject(getApiErrorMessage(error));
          });
      } else {
        reject('No Internet Connection Available');
      }
    });
  });
};
export default apiWrapper;

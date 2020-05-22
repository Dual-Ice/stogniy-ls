import axios from 'axios';

axios.defaults.baseURL = 'https://webdev-api.loftschool.com/';

export default function (method, url) {
  return axios({
    method: method,
    url: url
  })
    .then(({ data }) => data)
}
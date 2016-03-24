import axios from 'axios'

export default {
  getUsers() {
    let url = window.location.href + 'data.json';
    return axios.get(url)
      .then(response => {
        return response.data;
      });
  }
}

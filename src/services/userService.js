import axios from '../axios';

const userService = {
  handleLogin(username, password) {
    const formData = { username, password }
    return axios.post(`/api/login`, formData)
  },
  getAllUsers(inputId) {
    return axios.get(`api/get-all-user?id=${inputId}`)
  },
  checkUserExists(email) {
    return axios.get(`api/get-all-user?id=${email}`)
  }
};

export default userService;
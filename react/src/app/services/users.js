import axios from "./instance";

export const getPlayers = () => {
  return axios({
    url: `/users/players?user_name=mario123`,
    method: "GET",
  }).then((res) => res);
};

export const oktaLogIn = (user) => {
  return axios({
    url: `/users/aut`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName: user,
      email: "user@mail.com",
      empNumber: 0,
    },
  }).then((res) => res);
};

export const adminLogIn = (user, password) => {
  return axios({
    url: `/users/autadmin`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName: user,
      password: password,
    },
  }).then((res) => res);
};

export const addComment = (userName, comment, worldType) => {
  return axios({
    url: `/users/autadmin`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName,
      comment,
      worldType,
    },
  }).then((res) => res);
};

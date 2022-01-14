import axios from "./instance";

export const getWorlds = (user) => {
  return axios({
    url: `/worlds`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      user,
    },
  }).then((res) => res);
};

export const setScore = (userName, worldType, score, time) => {
  return axios({
    url: `/worlds/score`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName,
      worldType,
      score,
      time,
    },
  }).then((res) => res);
};

export const unlockWorld = (userName, worldType) => {
  return axios({
    url: `/worlds/status`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName,
      worldType,
      active: true,
    },
  }).then((res) => res);
};

import axios from "../../../state/axios";

export const getPosts = () => {
  return axios.get(`/posts`);
};

export const createPost = newPost => {
  return axios.post(`/posts`, newPost);
};

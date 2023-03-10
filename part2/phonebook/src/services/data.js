import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, editedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, editedObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
  // it will return an empty {} after the delete
  // return request.then((response) => console.log(response));
};

export default { getAll, create, update, deletePerson };

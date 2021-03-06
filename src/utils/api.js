import axios from 'axios';

const baseUrl = 'https://algoexplorerapi.io/idx2';

export const getAsset = async (id) => axios.get(`${baseUrl}/v2/assets/${id}?include-all=true`);

export const searchAsset = async (name) =>
  axios.get(`${baseUrl}/v2/assets?name=${name}&include-all=true`);

export const getApplication = async (id) =>
  axios.get(`${baseUrl}/v2/application/${id}`);

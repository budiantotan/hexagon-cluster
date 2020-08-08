import axios from 'axios';

const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
};

export const callGet = async path => {
  try {
    const res = await axios.get(path, axiosOptions);
    return {
      success: res.status === 200,
      result: res.data.result,
    };
  } catch (err) {
    const message =
      err && err.response && err.response.data && err.response.data.message;

    return {
      success: false,
      message: message || 'Failed to call API',
    };
  }
};

export const callPost = async (path, payload) => {
  try {
    const res = await axios.post(path, payload, axiosOptions);
    return {
      success: res.status === 200,
      result: res.data.result,
    };
  } catch (err) {
    console.error(err.response);
    const message =
      err && err.response && err.response.data && err.response.data.message;

    return {
      success: false,
      message: message || 'Failed to call API',
    };
  }
};

export const callDelete = async path => {
  try {
    const res = await axios.delete(path, axiosOptions);
    return {
      success: res.status === 200,
      result: res.data.result,
    };
  } catch (err) {
    const message =
      err && err.response && err.response.data && err.response.data.message;

    return {
      success: false,
      message: message || 'Failed to call API',
    };
  }
};

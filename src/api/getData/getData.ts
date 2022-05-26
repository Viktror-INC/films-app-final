import { TGetData } from './@types';
import axios from 'axios';

export const getData = async (props: TGetData) => {
  const { url, options } = props;

  try {
    const response = await axios({
      method: options.method,
      url: url,
      data: options.body,
      headers: options.headers,
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

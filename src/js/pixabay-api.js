import axios from 'axios';
const API_Key = '47439400-a7b90577fcfc36b5c66ee25ec';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchData(value, page) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_Key,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}

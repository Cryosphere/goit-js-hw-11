import axios from 'axios';

const API_KEY = '34489847-fb4ace76cb0b4d30e99228503';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchRequest, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}

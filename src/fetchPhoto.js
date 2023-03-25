import axios from 'axios';
const axios = require('axios');

export const fetchPhoto = async (input, page) => {
  const key = '34489847-fb4ace76cb0b4d30e99228503';
  const params = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page,
  });
  if (input.trim() !== '') {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${key}&q=${input}&${params}`
    );
    const responseData = response.data;
    return responseData;
  }
};
import axios from 'axios';
const axios = require('axios');

export const fetchPhoto = async (input, page) => {
  const key = '28305156-2c31ea34b0b957161935cfaa0';
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
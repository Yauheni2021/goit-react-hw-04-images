import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '27666563-e68b1d227a46c65a42bf27c59';
const PER_PAGE ='12'

export const fetchApi = async (searchQuery, page = 1) => {
    const response = await axios({
      params: {
            key: `${API_KEY}`,
            q: searchQuery,
            page,
            per_page: `${PER_PAGE}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
      },
    });
  
    return response.data;
  };

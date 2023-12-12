import dotenv from 'dotenv';

dotenv.config();

const handler = async (event) => {

  const SECRET = process.env.VITE_SECRET_AUTHORIZATION;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${SECRET}`
    }
  };

  try {
    const searchQuery = event.queryStringParameters.query

    const fetchSearchResults = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options)
            
    const SearchResults = await fetchSearchResults.json();

    return {
      statusCode: 200,
      body: JSON.stringify(SearchResults),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export { handler };


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
    const listName = event.queryStringParameters.query.split(',')

    const fetchMoviesList = await fetch(`https://api.themoviedb.org/3/movie/${listName[0]}?language=en-US&page=${listName[1]}`, options)
            
    const MoviesList = await fetchMoviesList.json();

    return {
      statusCode: 200,
      body: JSON.stringify(MoviesList),
 
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export { handler };


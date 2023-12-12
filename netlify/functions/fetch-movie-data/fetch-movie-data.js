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
    const movieId = event.queryStringParameters.query

    const fetchMovieData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            
    const fetchCreditData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)

    const fetchVideoData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
    
    const fetchProvidersData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options)
    
    const ProvidersData = await fetchProvidersData.json();

    const VideoData = await fetchVideoData.json();

    const CreditData = await fetchCreditData.json();
    
    const MovieData = await fetchMovieData.json();

    const result = {VideoData,CreditData,MovieData,ProvidersData};

    return {
      statusCode: 200,
      body: JSON.stringify(result),
 
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export { handler };


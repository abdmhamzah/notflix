import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const GET_ALL = gql`
  {
    getAll {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
      tvSeries {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  }
`;

export default () => {
  const { error, loading, data } = useQuery(GET_ALL);
  const history = useHistory();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Home Page</h1>
      <h3>List Movies</h3>
      {data.getAll.movies.map((movie) => (
        <div key={movie._id}>
          <p>{movie.poster_path}</p>
          <p>{movie.title}</p>
          <p>{movie.popularity}</p>
          {/* <p>{movie.overview}</p>
          {movie.tags.map((tag) => (
            <div>
              <p>{tag}</p>
            </div>
          ))} */}
          <button onClick={() => history.push(`/movies/${movie._id}`)}>
            See Details
          </button>
        </div>
      ))}
      <h3>List Tv Series</h3>
      {data.getAll.tvSeries.map((tv) => (
        <div key={tv._id}>
          <p>{tv.poster_path}</p>
          <p>{tv.title}</p>
          <p>{tv.popularity}</p>
          {/* <p>{tv.overview}</p>
          {tv.tags.map((tag) => (
            <div>
              <p>{tag}</p>
            </div>
          ))} */}
          <button onClick={() => history.push(`/tv/${tv._id}`)}>
            See Details
          </button>
        </div>
      ))}
    </>
  );
};

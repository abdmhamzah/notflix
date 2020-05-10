import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components";

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default () => {
  const { error, loading, data } = useQuery(GET_MOVIES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Movies Page</h1>
      {/* <p>Isi Movies page</p>
      {JSON.stringify(data)} */}
      {data.movies.map((movie) => (
        <div key={movie._id}>
          <p>{movie.title}</p>
          <p>{movie.overview}</p>
          <p>{movie.poster_path}</p>
          <p>{movie.popularity}</p>
          {movie.tags.map((tag) => (
            <div>
              <p>{tag}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components";

export const GET_FAVORITES = gql`
  query {
    favorites @client {
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
  const { error, loading, data } = useQuery(GET_FAVORITES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Favorites</h1>
      {/* {data && JSON.stringify(data)} */}
      {data.favorites.map((movie) => (
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
        </div>
      ))}
    </>
  );
};

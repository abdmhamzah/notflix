import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { error, loading, data, refetch } = useQuery(GET_MOVIES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Movies Page</h1>
      <button onClick={() => history.push("/formMovies")}>Add New</button>
      {data.movies.map((movie) => (
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
          <button
            onClick={() =>
              history.push({
                pathname: `/movies/${movie._id}`,
                state: movie,
              })
            }
          >
            See Details
          </button>
        </div>
      ))}
    </>
  );
};

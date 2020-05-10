import React from "react";
import { useParams, useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Loading } from "../components";

const GET_MOVIE = gql`
  query movie($idMovie: ID!) {
    movie(idMovie: $idMovie) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation deleteMovie($idMovie: ID!) {
    deleteMovie(idMovie: $idMovie) {
      deletedCount
    }
  }
`;

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const { error, loading, data } = useQuery(GET_MOVIE, {
    variables: { idMovie: id },
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE);

  function deleteMovieData() {
    deleteMovie({ variables: { idMovie: id } });
    history.push("/movies");
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Detail Movies</h1>
      {/* {JSON.stringify(id)}
      {JSON.stringify(data)} */}
      <div>
        <p>{data.movie.poster_path}</p>
        <p>{data.movie.title}</p>
        <p>{data.movie.popularity}</p>
        <p>{data.movie.overview}</p>
        {data.movie.tags.map((tag, idx) => (
          <div key={idx}>
            <p>{tag}</p>
          </div>
        ))}
        <button>Edit Movie</button>
        <button onClick={deleteMovieData}>Delete Movie</button>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
    </>
  );
};

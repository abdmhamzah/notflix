import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_MOVIE = gql`
  mutation deleteMovie($idMovie: ID!) {
    deleteMovie(idMovie: $idMovie) {
      deletedCount
    }
  }
`;

const ADD_TO_FAVORITES = gql`
  mutation addToFavorites($movie: movie) {
    addToFavorites(movie: $movie) @client {
      _id
    }
  }
`;

export default () => {
  const history = useHistory();
  const location = useLocation();
  const { state: movie } = location;

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => {
      history.push("/movies");
    },
  });

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);

  function deleteMovieData() {
    deleteMovie({ variables: { idMovie: movie._id } });
  }

  function addMovieToFavorites() {
    addToFavorites({ variables: { movie: movie } });
  }

  return (
    <>
      <h1>Detail Movies</h1>
      <div>
        <p>{movie.poster_path}</p>
        <p>{movie.title}</p>
        <p>{movie.popularity}</p>
        <p>{movie.overview}</p>
        {movie.tags.map((tag, idx) => (
          <div key={idx}>
            <p>{tag}</p>
          </div>
        ))}
        <button onClick={addMovieToFavorites}>Add to Favorites</button>
        <button
          onClick={() =>
            history.push({ pathname: "/formMovies", state: movie })
          }
        >
          Edit Movie
        </button>
        <button onClick={deleteMovieData}>Delete Movie</button>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Badge, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

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
  const [added, setAdded] = useState(false);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => {
      history.push("/movies");
    },
  });

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);

  function deleteMovieData() {
    Swal.fire({
      title: "Are you sure?",
      text: "This Movie will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteMovie({ variables: { idMovie: movie._id } });
      }
    });
  }

  function addMovieToFavorites() {
    Toast.fire({
      icon: "success",
      title: "Added to My Favorites successfully",
    });
    setAdded(true);
    addToFavorites({ variables: { movie: movie } });
  }

  return (
    <>
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>Detail Movies</h1>
      <div className="d-flex justify-content-md-center my-2">
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                className="bd-placeholder-img"
                width="100%"
                height="250"
                alt="Poster"
                src={movie.poster_path}
              ></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {movie.title}
                  <Badge style={{ marginLeft: "10px" }} variant="warning">
                    <i className="fa fa-star"></i> {movie.popularity} / 10
                  </Badge>
                </h5>
                <p className="card-text">{movie.overview}</p>
                <div>
                  {movie.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      style={{ marginRight: "5px", marginBottom: "20px" }}
                      variant="info"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  {added ? (
                    <Button
                      onClick={addMovieToFavorites}
                      style={{ marginBottom: "10px" }}
                      variant="warning"
                      size="sm"
                      disabled
                    >
                      <i className="fa fa-heart"></i> Add to Favorites
                    </Button>
                  ) : (
                    <Button
                      onClick={addMovieToFavorites}
                      style={{ marginBottom: "10px" }}
                      variant="warning"
                      size="sm"
                    >
                      <i className="fa fa-heart"></i> Add to Favorites
                    </Button>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    onClick={() =>
                      history.push({ pathname: "/formMovies", state: movie })
                    }
                    style={{ marginRight: "10px" }}
                    variant="outline-info"
                    size="sm"
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </Button>
                  <Button
                    onClick={deleteMovieData}
                    style={{ marginRight: "10px" }}
                    variant="outline-danger"
                    size="sm"
                  >
                    <i className="fa fa-trash"></i> Delete
                  </Button>
                  <Button
                    onClick={() => history.goBack()}
                    variant="outline-dark"
                    size="sm"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "react-bootstrap";
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

const ADD_MOVIE = gql`
  mutation addMovie($inputData: InputMovie!) {
    addMovie(inputData: $inputData) {
      _id
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation updateMovie($idMovie: ID!, $inputData: InputMovie!) {
    updateMovie(idMovie: $idMovie, inputData: $inputData) {
      _id
    }
  }
`;

export default () => {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  const [title, setTitle] = useState(state ? state.title : "");
  const [overview, setOverview] = useState(state ? state.overview : "");
  const [poster_path, setPosterPath] = useState(state ? state.poster_path : "");
  const [popularity, setPopularity] = useState(state ? state.popularity : "");
  const [tags, setTags] = useState(state ? String(state.tags) : "");

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    onCompleted: () => {
      setTitle("");
      setOverview("");
      setPosterPath("");
      setPopularity("");
      setTags("");
      history.push("/movies");
    },
  });

  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: () => {
      setTitle("");
      setOverview("");
      setPosterPath("");
      setPopularity("");
      setTags("");
      history.push("/movies");
    },
  });

  function formAddUpdateMovie(e) {
    e.preventDefault();
    if (title === "" || title === null || title === undefined) {
      Toast.fire({
        icon: "error",
        title: "Title Movie must be Filled",
      });
    } else if (overview === "" || overview === null || overview === undefined) {
      Toast.fire({
        icon: "error",
        title: "Overview Movie must be Filled",
      });
    } else if (
      poster_path === "" ||
      poster_path === null ||
      poster_path === undefined
    ) {
      Toast.fire({
        icon: "error",
        title: "URL Poster Movie must be Filled",
      });
    } else if (tags === "" || tags === null || tags === undefined) {
      Toast.fire({
        icon: "error",
        title: "Tags Movie must be Filled",
      });
    } else if (
      popularity === "" ||
      popularity === null ||
      popularity === undefined
    ) {
      Toast.fire({
        icon: "error",
        title: "Popularity Movie must be Filled",
      });
    } else if (Number(popularity) < 0 || Number(popularity) > 10) {
      Toast.fire({
        icon: "error",
        title: "Popularity Movie must be between 0 and 10",
      });
    } else if (!Number(popularity)) {
      Toast.fire({
        icon: "error",
        title: "Popularity Movie must be a Number",
      });
    } else {
      const InputMovie = {
        title,
        overview,
        poster_path,
        tags,
        popularity: Number(popularity),
      };
      if (state) {
        const idMovie = state._id;
        Toast.fire({
          icon: "success",
          title: "Movie Data Updated Successfully",
        });
        updateMovie({ variables: { idMovie: idMovie, inputData: InputMovie } });
      } else {
        Toast.fire({
          icon: "success",
          title: "New Movie Created Successfully",
        });
        addMovie({ variables: { inputData: InputMovie } });
      }
    }
  }

  return (
    <>
      <h1 style={{ marginTop: "20px" }}>Form Add Movies</h1>
      <div
        style={{ marginTop: "15%" }}
        className="d-flex justify-content-md-center my-2"
      >
        <Form
          onSubmit={formAddUpdateMovie}
          style={{ width: "40%", marginTop: "3%" }}
        >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Movie Title"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Overview</Form.Label>
            <Form.Control
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              type="text"
              placeholder="Ener Movie Overview"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Poster Image URL</Form.Label>
            <Form.Control
              value={poster_path}
              onChange={(e) => setPosterPath(e.target.value)}
              type="url"
              placeholder="Enter Poster Image URL"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Popularity</Form.Label>
            <Form.Control
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              type="number"
              step="any"
              placeholder="Enter Movie Popularity"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="Enter Tags, separated by Comma"
            />
          </Form.Group>
          {state ? (
            <Button
              type="submit"
              style={{ marginRight: "1%" }}
              variant="primary"
            >
              Update
            </Button>
          ) : (
            <Button type="submit" style={{ marginRight: "1%" }} variant="info">
              Submit
            </Button>
          )}
          <Button
            onClick={() => history.goBack()}
            style={{ marginLeft: "1%" }}
            variant="outline-danger"
          >
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

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
    const InputMovie = {
      title,
      overview,
      poster_path,
      tags,
      popularity: Number(popularity),
    };
    if (state) {
      const idMovie = state._id;
      updateMovie({ variables: { idMovie: idMovie, inputData: InputMovie } });
    } else {
      addMovie({ variables: { inputData: InputMovie } });
    }
  }

  return (
    <>
      <h1>Form Add Movies</h1>
      <form onSubmit={formAddUpdateMovie}>
        <label>Title</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title Here"
          required
        />
        <br />
        <label>Overview</label>
        <br />
        <textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          type="text"
          placeholder="Enter Overview Here"
          required
        />
        <br />
        <label>Poster Image URL</label>
        <br />
        <input
          value={poster_path}
          onChange={(e) => setPosterPath(e.target.value)}
          type="url"
          placeholder="Enter Poster URL Here"
          required
        />
        <br />
        <label>Popularity</label>
        <br />
        <input
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          type="number"
          min="0"
          max="10"
          step="0.5"
          placeholder="9.0"
          required
        />
        <br />
        <label>Tags</label>
        <br />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
          placeholder="Enter Tags Here, separated by comma"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};

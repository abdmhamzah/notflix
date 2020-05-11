import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
// import { Loading } from "../components";

const ADD_MOVIE = gql`
  mutation addMovie($inputData: InputMovie!) {
    addMovie(inputData: $inputData) {
      _id
    }
  }
`;

// const GET_MOVIES = gql`
//   {
//     movies {
//       _id
//       title
//       overview
//       poster_path
//       popularity
//       tags
//     }
//   }
// `;

export default () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPosterPath] = useState("");
  const [popularity, setPopularity] = useState("");
  const [tags, setTags] = useState("");

  // const { error, loading, data } = useQuery(GET_MOVIES);
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

  function formAddMovie(e) {
    e.preventDefault();
    const InputMovie = {
      title,
      overview,
      poster_path,
      tags,
      popularity: Number(popularity),
    };
    console.log(InputMovie);
    addMovie({ variables: { inputData: InputMovie } });
  }

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <>
      <h1>Form Add Movies</h1>
      <form onSubmit={formAddMovie}>
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
        <button onClick={() => history.push("/movies")}>Back</button>
      </form>
    </>
  );
};

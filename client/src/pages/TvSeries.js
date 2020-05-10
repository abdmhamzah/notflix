import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Loading } from "../components";

const GET_TV_SERIES = gql`
  {
    tvSeries {
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
  const { error, loading, data } = useQuery(GET_TV_SERIES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Tv Series Page</h1>
      <button onClick={() => history.push("/addTvSeries")}>Add New</button>
      {/* <p>Isi Tv Series page</p>
      {JSON.stringify(data)} */}
      {data.tvSeries.map((tv) => (
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

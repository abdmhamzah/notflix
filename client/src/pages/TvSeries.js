import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
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
      {/* <p>Isi Tv Series page</p>
      {JSON.stringify(data)} */}
      {data.tvSeries.map((tv) => (
        <div key={tv._id}>
          <p>{tv.title}</p>
          <p>{tv.overview}</p>
          <p>{tv.poster_path}</p>
          <p>{tv.popularity}</p>
          {tv.tags.map((tag) => (
            <div>
              <p>{tag}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

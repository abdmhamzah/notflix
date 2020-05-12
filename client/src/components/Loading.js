import React from "react";
import LoadingGif from "../assets/loading.gif";

export default () => {
  return (
    <>
      <div className="loading">
        <div className="d-flex justify-content-md-center my-2">
          <img src={LoadingGif} alt="Loading Animation" />
        </div>
      </div>
    </>
  );
};

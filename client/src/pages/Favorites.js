import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export const GET_FAVORITES = gql`
  query {
    favorites @client {
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
  const { error, loading, data } = useQuery(GET_FAVORITES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>My Favorites</h1>
      {data.favorites.length === 0 && (
        <>
          <div className="empty-detail">
            <div className="d-flex justify-content-md-center my-2">
              <h4>Oops.. it seems Empty</h4>
            </div>
            <div className="d-flex justify-content-md-center my-2">
              <Button onClick={() => history.push(`/movies`)} variant="info">
                Get My Movies
              </Button>
            </div>
          </div>
        </>
      )}
      {data.length !== 0 && (
        <Container>
          <Row>
            {data.favorites.map((movie) => (
              <Col key={movie._id} sm={4} md={3} lg={3} className="my-2">
                <Image src={movie.poster_path} fluid className="card" />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { PosterCarousel } from "../components";
import { Container, Col, Row, Image } from "react-bootstrap";

const GET_ALL = gql`
  {
    getAll {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
      tvSeries {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  }
`;

export default () => {
  const { error, loading, data } = useQuery(GET_ALL);
  const history = useHistory();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <PosterCarousel />
      <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
        Movies Collections
      </h3>
      <Container data-testid="homepage-listcards">
        <Row>
          {data.getAll.movies.map((movie) => (
            <Col key={movie._id} sm={4} md={3} lg={3} className="my-2">
              <Image
                src={movie.poster_path}
                fluid
                className="card"
                onClick={() =>
                  history.push({
                    pathname: `/movies/${movie._id}`,
                    state: movie,
                  })
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
      <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
        TV Series Collections
      </h3>
      <Container data-testid="homepage-listcards">
        <Row>
          {data.getAll.tvSeries.map((tv) => (
            <Col key={tv._id} sm={4} md={3} lg={3} className="my-2">
              <Image
                src={tv.poster_path}
                fluid
                className="card"
                onClick={() =>
                  history.push({
                    pathname: `/tv/${tv._id}`,
                    state: tv,
                  })
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

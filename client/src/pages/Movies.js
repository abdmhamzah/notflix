import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Loading } from "../components";
import { Container, Col, Row, Image, Button } from "react-bootstrap";

const GET_MOVIES = gql`
  {
    movies {
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
  const { error, loading, data, refetch } = useQuery(GET_MOVIES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
        Movies Collections
      </h1>
      <Button
        onClick={() => history.push("/formMovies")}
        style={{ marginBottom: "20px" }}
        variant="secondary"
      >
        Add New
      </Button>
      <Container>
        <Row>
          {data.movies.map((movie) => (
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
    </>
  );
};

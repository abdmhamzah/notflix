import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Loading } from "../components";
import { Container, Col, Row, Image, Button } from "react-bootstrap";

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
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
        Tv Series Collections
      </h1>
      <Button
        onClick={() => history.push("/addTvSeries")}
        style={{ marginBottom: "20px" }}
        variant="secondary"
      >
        Add New
      </Button>
      <Container>
        <Row>
          {data.tvSeries.map((tv) => (
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

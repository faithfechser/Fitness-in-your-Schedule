// dependencies & imports
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { GET_ME } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";
import auth from "../utils/auth";
import { removeExerciseId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";

const SavedExercise = () => {
  const [loading, data] = useQuery(GET_ME);
  let userData = data?.me || {};
  const [removeExercise] = useMutation(REMOVE_EXERCISE);

  // function that accepts the mongo _id value as param and deletes the exercise from the database
  const handleDeleteExercise = async (exerciseId) => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeExercise({
        variables: { exerciseId },
      });

      // upon success, remove exercise's id from localStorage
      removeExerciseId(exerciseId);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved exercises!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.SavedExercise.length
            ? `Viewing ${userData.SavedExercise.length} saved ${
                userData.SavedExercise.length === 1
                  ? "exercise"
                  : "SavedExercise"
              }:`
            : "You have no saved exercises!"}
        </h2>
        <Row>
          {userData.SavedExercise.map((exercise) => {
            return (
              <Col md="4">
                <Card key={exercise.exerciseId} border="dark">
                  {exercise.image ? (
                    <Card.Img
                      src={exercise.image}
                      alt={`Thumbnail of ${exercise.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{exercise.title}</Card.Title>
                    <Card.Text>{exercise.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteExercise(exercise.exerciseId)}>
                      Delete exercise!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedExercise;

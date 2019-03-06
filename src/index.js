import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from "reactstrap";
import initialTimeSlots from "./initialTimeSlots.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "inputChange":
          return { ...state, [action.fieldName]: action.fieldValue };
        case "bookTimeSlot":
          return {
            ...state,
            timeslots: state.timeslots.map(timeslot => {
              if (timeslot.id !== state.timeslotID) {
                return timeslot;
              }
              return {
                ...timeslot,
                booked: true,
                contactName: state.contactName,
                contactPhone: state.contactPhone
              };
            })
          };
        case "closeBookingModal":
          return {
            ...state,
            bookingModalStatus: "closed",
            timeslotID: null,
            contactName: "",
            contactPhone: ""
          };
        case "openBookingModal":
          return {
            ...state,
            bookingModalStatus: "opened",
            timeslotID: action.timeslotID
          };
        case "closeReviewingModal":
          return {
            ...state,
            reviewingModalStatus: "closed",
            timeslotID: null,
            contactName: "",
            contactPhone: ""
          };
        case "openReviewingModal":
          const { contactName, contactPhone } = state.timeslots.find(
            ({ id }) => id === action.timeslotID
          ) || { contactName: "y", contactPhone: "u" };
          return {
            ...state,
            reviewingModalStatus: "opened",
            timeslotID: action.timeslotID,
            contactName,
            contactPhone
          };
        default:
          return state;
      }
    },
    {
      timeslots: initialTimeSlots,
      bookingModalStatus: "closed",
      reviewingModalStatus: "closed",
      contactName: "",
      contactPhone: "",
      timeslotID: null
    }
  );
  const {
    timeslots,
    bookingModalStatus,
    reviewingModalStatus,
    contactName,
    contactPhone
  } = state;

  function onCloseBookingModal(e) {
    dispatch({ type: "closeBookingModal" });
  }
  function onOpenBookingModal(e) {
    const timeslotID = parseInt(e.target.getAttribute("data-timeslot-id"), 10);
    dispatch({ type: "openBookingModal", timeslotID });
  }
  function onCloseBookingModal() {
    dispatch({ type: "closeBookingModal" });
  }
  function onOpenReviewingModal(e) {
    const timeslotID = parseInt(e.target.getAttribute("data-timeslot-id"), 10);
    dispatch({ type: "openReviewingModal", timeslotID });
  }
  function onCloseReviewingModal() {
    dispatch({ type: "closeReviewingModal" });
  }

  function onFormFieldChange(e) {
    dispatch({
      type: "inputChange",
      fieldName: e.target.name,
      fieldValue: e.target.value
    });
  }
  function onBookTimeSlot(e) {
    e.preventDefault();
    if (contactName === "") {
      return;
    } else if (contactPhone === "") {
      return;
    }
    dispatch({ type: "bookTimeSlot" });
    dispatch({ type: "closeBookingModal" });
  }
  function onUpdateTimeSlot(e) {
    e.preventDefault();
    dispatch({ type: "bookTimeSlot" });
    dispatch({ type: "closeReviewingModal" });
  }
  return (
    <>
      <Jumbotron className="text-sm-left text-md-center">
        <Container>
          <h1 className="display-4">Let's Connect! 📅</h1>
          <hr className="my-2" />
          <p className="lead">
            Tap or click on an available timeslot below to book an appointment.{" "}
          </p>
          <p>
            Time slots marked in <span className="red-text">red</span> are
            already booked.
          </p>
        </Container>
      </Jumbotron>

      <Container className="App">
        <Row>
          {timeslots.map(({ id, startTime, endTime, booked }) => {
            if (!booked) {
              return (
                <Col sm={{ size: 8, offset: 2 }} key={id}>
                  <Card body key={id}>
                    <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                    <Button
                      color="primary"
                      onClick={onOpenBookingModal}
                      data-timeslot-id={id}
                    >
                      Book This Time Slot
                    </Button>
                  </Card>
                </Col>
              );
            }
            return (
              <Col sm={{ size: 8, offset: 2 }} key={id}>
                <Card body key={id} color="danger" outline>
                  <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                  <Button
                    color="danger"
                    onClick={onOpenReviewingModal}
                    data-timeslot-id={id}
                  >
                    Update This Time Slot
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Modal
          isOpen={bookingModalStatus === "opened"}
          toggle={onCloseBookingModal}
          className="bookingModal"
        >
          <ModalHeader toggle={onCloseBookingModal}>
            Please Enter Your Contact Information.
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={onBookTimeSlot}>
              <FormGroup>
                <Label for="contactName">Your Name</Label>
                <Input
                  type="text"
                  name="contactName"
                  id="contactName"
                  placeholder="First and Last Name"
                  onChange={onFormFieldChange}
                  value={contactName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contactPhone">Your Phone Number</Label>
                <Input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  placeholder="1-(555)-555-5555"
                  onChange={onFormFieldChange}
                  value={contactPhone}
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="mx-1"
                onClick={onBookTimeSlot}
              >
                Book This Time Slot
              </Button>
              <Button
                color="secondary"
                className="mx-1"
                onClick={onCloseBookingModal}
              >
                Nevermind
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={reviewingModalStatus === "opened"}
          toggle={onCloseReviewingModal}
          className="reviewingModal"
        >
          <ModalHeader toggle={onCloseReviewingModal}>
            Update Your Contact Information.
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={onUpdateTimeSlot}>
              <FormGroup>
                <Label for="contactName2">Your Name</Label>
                <Input
                  type="text"
                  name="contactName"
                  id="contactName2"
                  placeholder="First and Last Name"
                  onChange={onFormFieldChange}
                  value={contactName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contactPhone2">Your Phone Number</Label>
                <Input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone2"
                  placeholder="1-(555)-555-5555"
                  onChange={onFormFieldChange}
                  value={contactPhone}
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="mx-1"
                onClick={onUpdateTimeSlot}
              >
                Save Updates
              </Button>
              <Button
                color="secondary"
                className="mx-1"
                onClick={onCloseReviewingModal}
              >
                Nevermind
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

# Appointment-Booking-App

An application which allows the user to view a list of available appointment times and to select one.

## Implementation

This project is implemented in React.js. Specifically, it is built on [`create-react-app`](https://facebook.github.io/create-react-app/) and uses [`reactstrap`](https://reactstrap.github.io/) for styling.
State is managed via the [`useReducer` Hook](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Specifications

This application was built according to the following provided specs:

> - Build a screen which shows a list of hour-long time slots from 9am to 5pm.
>
> - When one time slot is clicked, pop up a modal which asks for name and phone number.
>
> - When the name and phone number is submitted, the time slot selected should change to red, indicating the time slot is no longer available.
>
> - If the red time slot is clicked on again, the modal will pop up with the name and phone number for that appointment prepopulated.  Users will be able to edit the name and phone number to change the user for the appointment.

## Deployment

This demo app is live [on CodeSandbox](https://codesandbox.io/s/github/womcauliff/Appointment-Booking-App).

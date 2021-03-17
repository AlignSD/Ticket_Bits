import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import EventInfo from "./CreateEventComponents/EventInfo";
import EventLocation from "./CreateEventComponents/EventLocation";
import EventDateTime from "./CreateEventComponents/EventDateTime";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  containerSm: {
    width: "60ch",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paragraphText: {
    marginBottom: "3vh",
  },
  btnMargin: {
    margin: theme.spacing(1),
  },
}));

// export default function LayoutTextFields() {
//   const classes = useStyles();

//   return (
//     <EventInfo />
//     <EventLocation />
//     <EventDateTime />
//   );
// }

function CreateEvent() {
  return (
    <div className="App">
      <EventInfo />
      <EventLocation />
      <EventDateTime />
    </div>
  );
}

export default CreateEvent;

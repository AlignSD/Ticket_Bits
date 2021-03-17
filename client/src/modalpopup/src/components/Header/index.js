import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EventInfo from "../../pages/CreateEventComponents/EventInfo";
import EventLocation from "../../pages/CreateEventComponents/EventLocation";
import EventDateTime from "../../pages/CreateEventComponents/EventDateTime";
import "./styles.css";

function rand() {
  return Math.round(Math.random() * 1) - 10;
}

function getModalStyle() {
  const top = 10 + rand();
  // const left = 50 + rand();

  return {
    top: `${top}%`,

    transform: `translate(-${top}%)`,
  };
}

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
  paper: {
    position: "relative",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #CCC",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function Header() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Router>
      <div style={modalStyle} className={classes.paper}>
        {/* Set up routes here to move to next component*/}

        <Route path="/">
          <EventInfo />
        </Route>

        <Route path="/location">
          <EventLocation />
        </Route>

        <Route path="/datetime">
          <EventDateTime />
        </Route>
      </div>
    </Router>
  );

  return (
    <div className="jumbotron jumbotron-fluid text-center">
      <div className="container">
        <h1 className="display-4">BlockChained Event Tickets</h1>
        <p className="lead">Buy And Sell Tickets The Secure Way</p>
        {/* <div class="d-flex justify-content-center px-5">
                    <div class="search"> <input type="text" class="search-input" placeholder="Search..." name="" /> <a href="#" class="search-icon"> <i class="fa fa-search"></i> </a></div>
                    </div> */}

        <div>
          <Button size="large" variant="contained" onClick={handleOpen}>
            Create an Event
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Header;

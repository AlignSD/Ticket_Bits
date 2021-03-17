import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import "./styles.css";

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

function Header() {
  const classes = useStyles();

  return (
    <div className="jumbotron jumbotron-fluid text-center">
      <div className="container">
        <h1 className="display-4">BlockChained Event Tickets</h1>
        <p className="lead">Buy And Sell Tickets The Secure Way</p>
        <div class="d-flex justify-content-center px-5">
                    <div class="search"> <input type="text" class="search-input" placeholder="Search..." name="" /> <a href="#" class="search-icon"> <i class="fa fa-search"></i> </a></div>
                    </div>
        {/* <TextField
            id="outlined-full-width"
            label="Search an Event *"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          /> */}
      </div>
    </div>
  );
}

export default Header;

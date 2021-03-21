import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  logo: {
    height: 200,
  },
  grid: {
    height: 75,
  },
  chain: {
    color: "#ffffff",
    fontSize: "18px",
    marginLeft: "10px",
  },
  button: {
    height: 50,
  },
  footer: {
    backgroundColor: "#686666",
    opacity: 1,
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1,
    padding: 20,
  },
});

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      {/* <div className="logo" /> */}
      <Typography align="center">
        Ticket-Bits{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://auth0.com">
          Link to some random place
        </a>
      </Typography>
    </footer>
  );
}

export default Footer;

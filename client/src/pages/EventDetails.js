import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btnMargin: {
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    }
  },
  eventName: {
    marginBottom: 10,
  },
  eventLocation: {
    opacity: 0.54,
    marginBottom: 10,
  },
  eventInfo: {
    lineHeight: 1.5,
  },
  contained:{
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginTop: 50,
    marginRight: "auto",
    marginBottom: 150,
    marginLeft: "auto",
    minheight: 715,
    padding: 20,
    zIndex: 1
  }
}));



export default function EventDetails() {
  const classes = useStyles();

  return (
    <div className={classes.contained}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <img
              src="https://images.discotech.me/artists/8afa7b3a-6d68-467c-805d-04b538dee1d1.jpg"
              alt=""
              className="img-fluid"
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h3" className={classes.eventName}>
            <strong>WET Pool Party featuring Tortured Soul</strong>
            </Typography>
            <Typography variant="h5" className={classes.eventLocation}>
              Palomar Hotel, San Diego
            </Typography>
            <Typography variant="body1" className={classes.eventInfo}>
            <strong>Start:</strong> 03/27/2021 at 12:00pm
            </Typography>
            <Typography variant="body1" className={classes.eventInfo}>
            <strong>End:</strong> 03/27/2021 at 10:00pm
            </Typography>
            <Typography variant="body1" className={classes.eventInfo}>
            <strong>Available Tickets:</strong> 300
            </Typography>
            <Typography variant="body1" className={classes.eventInfo}>
            <strong>Ticket Price:</strong> $25
            </Typography>
            <hr />
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Description:</strong> Zombie ipsum reversus ab viral
              inferno, nam rick grimes malum cerebro. De carne lumbering animata
              corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De
              apocalypsi gorger omero undead survivor dictum mauris. Hi mindless
              mortuis soulless creaturas, imo evil stalking monstra adventus
              resi dentevil vultus comedat cerebella viventium. Qui animated
              corpse, cricket bat max brucks terribilem incessu zomby. The
              voodoo sacerdos flesh eater, suscitat mortuos comedere carnem
              virus. Zonbi tattered for solum oculi eorum defunctis go lum
              cerebro. Nescio brains an Undead zombies. Sicut malus putrid
              voodoo horror. Nigh tofth eliv ingdead.
            </Typography>
            <Button
          size="large"
          variant="contained"
          className={classes.btnMargin}
        >
          Buy Ticket
        </Button>
          </Grid>
        </Grid>
        <hr />
      </div>
    </div>
  );
}

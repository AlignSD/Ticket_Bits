import React, {  useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {TicketsContext} from '../utils/TicketsContext'

// Event host sells tickets thru Seller component
// could be converted into a functional component if bored
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  contained: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginTop: 50,
    marginRight: "auto",
    marginBottom: 150,
    marginLeft: "auto",
    padding: 20,
    width: "100%",
    zIndex: 1,
  },
  btnMargin: {
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
});
function Seller(props) {

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

  let {setCaptureFile} = useContext(TicketsContext)

  const [input, setInput] = useState({
    imgHash: '',
    name: '',
    prce: '',
    startDate: '',
    location: '',
    description: ''
  })

  // function convertFile (captureFile) {
  //   // console.log(captureFile)
  //   const file = new Blob([captureFile], {type: '.jpg, .jpeg, .png, .bmp, .gif'})
  //   const reader = new window.FileReader()
  //   reader.readAsArrayBuffer(file)

  //   reader.onloadend = () => {
  //     setInput({ input, msgHash: Buffer(reader.result) })
  //     console.log('buffer', input.msgHash)
  //   } 

  //       console.log("Submitting file to ipfs...")

  //       //adding file to the IPFS
  //       ipfs.add(input.msgHash, (error, result) => {
  //         console.log('Ipfs result', result)
  //         if (error) {
  //           console.error(error)
  //           return
  //         }

  //       })
  //       return input.msgHash
  // }

  const classes = useStyles();

  return (
    <div className={classes.contained}>
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <div id="content" style={{ zIndex: 1 }}>
              <h1 style={{ color: "black" }}>Add Ticket</h1>
              <form
                onSubmit={(event) => {
                  
                  event.preventDefault();
                  // convertFile();                 
                  // console.log(event)
                  // console.log(captureFile)
                  // let blob = new Blob([captureFile], {type: '.jpg, .jpeg, .png, .bmp, .gif'})
                  // console.log(blob)


                  // const reader = new FileReader()
                  // reader.readAsArrayBuffer(blob)
                  
                  // reader.onloadend = () => {

                  //   console.log(reader.result)
                  //   setInput({...input, imgHash: Buffer.from(reader.result) })
                  //   console.log(input.imgHash)
                  //   console.log('buffer', input.imgHash)
                  // }

                  //     ipfs.add(input.imgHash, (error, result) => {
                  //       console.log('Ipfs result', result)
                  //       if(error) {
                  //         console.error(error)
                  //         return
                  //       }


                  //       })
                  // const imgHash = input.imgHash;
                  const name = input.name;
                  const total = input.total;
                  const price = window.web3.utils.toWei(
                    input.price,
                    "Ether");
                  const startDate = input.startDate;
                  const location = input.location;
                  const description = input.description;
                  console.log( name, price, startDate, location, description)
                  props.createTicket( name, price, startDate, location, description);
                }}
              >
                {/* <div className="form-group mr-sm-2">
                  <input 
                    style={{ widith: "30%" }}
                    id="ticketImgHash"
                    type='file' accept=".jpg, .jpeg, .png, .bmp, .gif"
                    className="form"
                    placeholder="Image"
                    required
                    onChange={(e) => setCaptureFile({captureFile: e.target.value})}
                  />
                </div> */}
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketName"
                    type="text"
                    className="form"
                    placeholder="Ticket Name"
                    required
                    onChange={(e) => setInput({...input, name: e.target.value})}
                  />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketPrice"
                    type="text"
                    className="form"
                    placeholder="Ticket Price"
                    required
                    onChange={(e) => setInput({...input, price: e.target.value})}
                  />
                  </div>
                  <div>
                  <input
                    style={{ widith: "30%" }}
                    id="totalTickets"
                    type="text"
                    className="form"
                    placeholder="Ticket Amount"
                    required
                    onChange={(e) => setInput({...input, total: e.target.value})}
                  />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketStartDate"
                    type="text"
                    className="form"
                    placeholder="Start Date"
                    required
                    onChange={(e) => setInput({...input, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketLoaction"
                    type="text"
                    className="form"
                    placeholder="Loaction"
                    required
                    onChange={(e) => setInput({...input, location: e.target.value})}
                  />
                  <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketDescription"
                    type="text"
                    className="form"
                    placeholder="Description"
                    required
                    onChange={(e) => setInput({...input, description: e.target.value})}
                  />
                </div>
                </div>
                <Button type="submit" className={classes.btnMargin}>
                  Add Ticket
                </Button>
              </form>
              <p>&nbsp;</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Seller;
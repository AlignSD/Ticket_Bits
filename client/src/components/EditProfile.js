import React from 'react'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";




export default function EditProfile() {

return(
<div>
<Typography gutterBottom variant="h4" component="h2">
  Edit Profile
</Typography>
<TextField
  id="outlined-margin-none"
  label="First Name"
  style={{ padding: 6 }}
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
  variant="outlined"
/>
<TextField
  id="outlined-margin-none"
  label="Last Name"
  style={{ padding: 6 }}
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
  variant="outlined"
/>
<TextField
  id="outlined-margin-none"
  label="Email"
  style={{ padding: 6 }}
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
  variant="outlined"
/>
</div>
)
}
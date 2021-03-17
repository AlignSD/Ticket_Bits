import React from 'react';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'

export default function Popup(props){

    const{ title, children, openPopup, setOpenPopup} = props


    return(
        <div>
      <Dialog open={openPopup}>
          <DialogTitle><div>Popup</div></DialogTitle>
          <DialogContent>
              <div>Content</div>

          </DialogContent>

      </Dialog>
      </div>
    )
        
    
}
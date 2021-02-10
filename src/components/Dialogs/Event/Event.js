/* eslint react/prop-types: 0 */
import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ApplicationList from '../../Lists/Application/Application';

// const useStyles = makeStyles({
//     root: {
//         maxWidth: 500,
//         maxHeight: 150,
//         padding: 10,
//     },
//     title: {
//       fontSize: 20,
//     },
//     media: {
//         height: 50,
//       },
//       button: {
//         margin: 5,
//     },
//   });

function EventDialog({
    open, handleClose, event, isFullScreen, acceptApplication, user
}){

    //const classes = useStyles();  

    const {applications} = event;

    const handleAccept = (application) => {
        acceptApplication(event, application);
    }

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
            <ApplicationList 
            applications={applications}
            acceptApplication={handleAccept}
            user={user}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventDialog;
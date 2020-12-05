import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const moment = require('moment');
require('moment/locale/en-ie');

function CreateEvent({
    open, handleClose, onSubmit, isFullScreen
}){

    const [eventDescription, setEventDescription ] = useState(""); 
    const [venueName, setVenueName] = useState("");
    const [venueLocation, setVenueLocation] = useState("");
    const startDate = new Date();
    const disableDate = new Date();
    const gracePeriod = 0;
    disableDate.setDate(startDate.getDate() + gracePeriod);
    startDate.setDate(startDate.getDate() + 1 + gracePeriod);
    const [eventDateTime, setEventDateTime ] = useState(moment(startDate).format());
    const [isDateSelectorOpen, setDateSelectorOpen] = useState(false);

    const resetEvent = () => {
        setEventDateTime(moment(startDate).format());
        setEventDescription("");
        setVenueName("");
        setVenueLocation("");
    }

    const handleSubmit = () => {
        const date = moment(eventDateTime).format('LLL');
        const sortDate = moment(eventDateTime).format('L');
        const newEvent = {
            venueName,
            venueLocation,
            eventDateTime: date,
            sortDate,
            eventDescription
        };
        onSubmit(newEvent);
        resetEvent();
    };

    const handleDateChange = (date) => {
        setEventDateTime(date);
      };

      const openDatePicker = () => {
        setDateSelectorOpen(true);
      };

      const closeDatePicker = () => {
        setDateSelectorOpen(false);
      };

      const disablePrevDates = (sDate) => {
        const startSeconds = Date.parse(sDate);
        return (date) => Date.parse(date) < startSeconds;
      };

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Venue"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Location"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDateTimePicker
                      required
                      variant="inline"
                      inputVariant="outlined"
                      id="date-picker-inline"
                      label="Event Date Time"
                      value={eventDateTime}
                      onChange={handleDateChange}
                      onClick={openDatePicker}
                      open={isDateSelectorOpen}
                      onClose={closeDatePicker}
                      fullWidth
                      shouldDisableDate={disablePrevDates(disableDate)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows="4"
                    label="Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 100}}
                />
                
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create Event</Button>
            </DialogActions>
        </Dialog>
    );
}

CreateEvent.defaultProps = {
    eventDateTime: "",
    eventDescription: "",
    venueName: "",
    venueLocation: ""
}

export default CreateEvent;
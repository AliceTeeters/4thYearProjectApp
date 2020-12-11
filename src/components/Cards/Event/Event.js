import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';
import CreateApplication from '../../Dialogs/CreateApplication/CreateApplication';
import EventDialog from '../../Dialogs/Event/Event';

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
        height: 170,
      },
  });

function Event({event, createApplication, acceptApplication, applications}){

    const classes = useStyles();
    const { venueName, eventDateTime, eventDescription, venueLocation, eventImage} = event;
    const [openApplication, setOpenApplication] = useState(false);
    const [openManage, setOpenManage] = useState(false)

    const openApplyForm = () => setOpenApplication(true);

    const closeForm = () => setOpenApplication(false);

    const renderButtons = (event) => {
        if(!event.artistName){
            return(
                <React.Fragment>
                    <Button onClick={openApplyForm}>Apply</Button>
                    <Button onClick={openManageDialog}>Manage Applications</Button>
                </React.Fragment>
            )
        }
    }

    const openManageDialog = () => setOpenManage(true);

    const closeManage = () => setOpenManage(false);
    return(
        <React.Fragment>
        <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={eventImage ? eventImage : "https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.ashx"}
                title="venue"
                />
            <CardContent>
                <Typography className={classes.title}>Venue: {venueName}</Typography>
                <Typography className={classes.title}>Location: {venueLocation}</Typography>
                {eventDescription ? <Typography component="p">Description: <br/>{eventDescription}</Typography> : <Typography className={classes.title}>Artist: {event.artistName}</Typography>}
                <Typography className={classes.pos}>Date & Time: {eventDateTime}</Typography>
            </CardContent>
            <CardActions>
                {renderButtons(event)}
                </CardActions>
            </CardActionArea>
        </Card>

        <CreateApplication
        open={openApplication}
        event={event}
        onSubmit={createApplication}
        handleClose={closeForm}
        />
        <EventDialog
        open={openManage}
        handleClose={closeManage}
        event={event}
        acceptApplication={acceptApplication}/>
        </React.Fragment>
)
}

export default Event;
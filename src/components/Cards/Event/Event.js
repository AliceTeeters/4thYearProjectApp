/* eslint react/prop-types: 0 */
import React, {useState, useEffect} from 'react';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';
import CreateApplication from '../../Dialogs/CreateApplication/CreateApplication';
import EventDialog from '../../Dialogs/Event/Event';
import defaultImage from '../../../images/pub.jpg';

function Event({event, createApplication, acceptApplication, user}){

    // const classes = useStyles();
    const { venueName, eventDateTime, eventDescription, venueLocation} = event;
    const [openApplication, setOpenApplication] = useState(false);
    const [openManage, setOpenManage] = useState(false);
    const [hasApplied, setApplied] = useState(false);

    useEffect(() => {
        if(event && event.applications){
            for (var i = 0; i < event.applications.length; i++) {
                if(user.username === event.applications[i].artistId){
                    setApplied(true);
                }
            }
        }
    },[]);

    const openApplyForm = () => setOpenApplication(true);
    const closeForm = () => setOpenApplication(false);

    const handleCreate = (newApplication, eventId) => {
        console.log('Application', newApplication);
        createApplication(newApplication, eventId);
        setApplied(true);
        closeForm();
    }

    const renderButtons = (event) => {
        if(!event.artistName){
            return(
                <React.Fragment>
                    {user.attributes['custom:user_type'] === 'artist' && hasApplied === false ? <Button onClick={openApplyForm}>Apply</Button> : null}
                    {user.attributes['custom:user_type'] === 'artist' && hasApplied === true ? <Button variant="contained" disabled>Applied</Button> : null}
                    {user.attributes['custom:user_type'] === 'venue' ? <Button onClick={openManageDialog}>Manage Applications</Button> : null}
                </React.Fragment>
            )
        }
    }

    const openManageDialog = () => setOpenManage(true);
    const closeManage = () => setOpenManage(false);

    return(
        <React.Fragment>
        <Card variant="outlined">
        <CardMedia
                component="img"
                image={defaultImage}
                title="venue"
                />    
            <CardContent>
                <Typography>Venue: {venueName}</Typography>
                <Typography>Location: {venueLocation}</Typography>
                {eventDescription ? <Typography component="p">Description: <br/>{eventDescription}</Typography> : <Typography>Artist: {event.artistName}</Typography>}
                <Typography>Date & Time: {eventDateTime}</Typography>
            </CardContent>
            <CardActionArea>
            <CardActions>
                {renderButtons(event)}
                </CardActions>
            </CardActionArea>
        </Card>

        <CreateApplication
        open={openApplication}
        event={event}
        onSubmit={handleCreate}
        handleClose={closeForm}
        user={user}
        />
        <EventDialog
        open={openManage}
        handleClose={closeManage}
        event={event}
        acceptApplication={acceptApplication}
        user={user}/>
        </React.Fragment>
)
}

export default Event;
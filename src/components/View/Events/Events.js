/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import EventsList from '../../Lists/Event/Event';
import CreateEvent from '../../Dialogs/CreateEvent/CreateEvent';
import { createNewEvent, createAcceptedEvent, fetchEvents, updateEventState } from '../../../functions/Events';
import { createNewApplication } from '../../../functions/Applications';
import { Grid, Button } from '@material-ui/core';

function ViewEvents({user}) {

    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const eventsList = await fetchEvents();
            setEvents(eventsList);
        }
        
        getEvents();
    }, []);

    const handleCreateEvent = async (event) => {
        try {
            console.log(event);
            await createNewEvent(event).then(res => {
                setEvents([...events, res]);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateApplication = async (application, eventId) => {
        try {
            await createNewApplication(application, eventId).then(res => {
                const updatedEvents = updateEventState(events, res);
                setEvents(updatedEvents);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptApplication = async (event, application) => {
        try {
            await createAcceptedEvent(event, application).then(res => {
                const updatedEvents = events.filter((e) => e.eventId !== event.eventId);
                updatedEvents.push(res);
                setEvents(updatedEvents);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const openCreate = () => setOpen(true);
    const closeCreate = () => setOpen(false);

    return(
        <React.Fragment>
            <Grid>
            {user.attributes['custom:user_type'] === 'venue' ? (
                <Grid item xs={12}>
                <Button variant="outline" onClick={openCreate}>Create New Event</Button>
            </Grid>
            ) : null}  
            <Grid item xs={12}>
            <EventsList
            events={events}
            createApplication={handleCreateApplication}
            acceptApplication={handleAcceptApplication}
            user={user}
            />
            </Grid>
            </Grid>
            <CreateEvent
            open={open}
            handleClose={closeCreate}
            onSubmit={handleCreateEvent}
            user={user}
            />
        </React.Fragment>
    );
}

export default ViewEvents;
/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import EventsList from '../../Lists/Event/Event';
import { Grid } from '@material-ui/core';

function ViewEvents({user, events, handleAcceptApplication, handleCreateApplication}) {

    return(
        <React.Fragment>
            <EventsList
            events={events}
            createApplication={handleCreateApplication}
            acceptApplication={handleAcceptApplication}
            user={user}
            />        
        </React.Fragment>
    );
}

export default ViewEvents;
import { getEvents, createEvent, updateEvent, deleteEvent } from '../api/Events';
import { fetchApplications } from './Applications';

    const formatEvents = async (e) => {
        try {
            await fetchApplications().then(res => {
                const applications = res.Items;
                for (var i = 0; i < e.length; i++) {
                    for (var j = 0; j < applications.length; j++){
                        if (applications[j].eventId === e[i].eventId){
                            e[i].applications.push(applications[j]);
                        }
                    }
                }
            });
            console.log('events w/ applications', e);
            return e;
        } catch (error) {
            console.log(error);
        }
    };

    export async function fetchEvents(){
        try {
            const events = await getEvents();
            const formattedEvents = await formatEvents(events.Items);
            return formattedEvents;
        } catch (error) {
            console.log(error);
        }
    };

    export async function createNewEvent(event){
        console.log("test1");
        const {venueName, venueLocation, eventDateTime, sortDate, eventDescription } = event;
        try {
            console.log("test2");
            const newEvent = {
                venueName,
                venueLocation,
                eventDateTime,
                sortDate,
                eventDescription,
                applications: []
            };
            const response = await createEvent(newEvent)
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
              }
            console.log(response);
            return response.Item;
        } catch (error) {
            console.error(error);
        }
    };

    export async function createAcceptedEvent(event, application){
        const {eventDateTime, eventDescription, sortDate, venueName, venueLocation} = event;
        const { artistName } = application;
        try{
            const acceptedEvent = {
                eventDateTime, 
                eventDescription, 
                sortDate, 
                venueName, 
                venueLocation,
                artistName
            };
            const response = await updateEvent(event.eventId, acceptedEvent);
            console.log(response);
            return response.Attributes;
        } catch (error) {
            console.log(error);
        }
    }

    export function updateEventState(events, application){
        
        for ( var i = 0; i < events; i++){
            if(events[i].eventsId === application.eventId){
                events[i].applications.push(application);
            }
        }
        return events;
    };
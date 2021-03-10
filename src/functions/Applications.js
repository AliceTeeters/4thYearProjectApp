import { getApplications, createApplication } from '../api/Applications';
//import { updateEventState } from './Events';


    export async function fetchApplications(){
        try {
            const applications = await getApplications();
            return applications
        } catch (error) {
            console.log(error);
        }
    }

    export async function createNewApplication(application, eventId, artistId){
        const { artistName, applicationHook, artistImage } = application;
        try {
            const newApplication = {
                eventId,
                artistName,
                artistImage,
                applicationHook,
                artistId
            };
            const response = await createApplication(newApplication)
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
              }
            return response.Item;
        } catch (error) {
            console.error(error);
        }
    }

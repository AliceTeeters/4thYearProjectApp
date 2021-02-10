import React, {useState} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField} from '@material-ui/core';

function SetUser({handleSetUserType}){

    const [name, setName] = useState();
    const [userType, setUserType] = useState();
    const [address, setAddress] = useState();

    const submitUserAttributes = () => {
        let attributes = {};
        if(userType === "venue"){
            attributes = {
                'name' : name,
                'custom:user_type' : userType, 
                'address': address,
            }
        }
        else{
            attributes = {
                'name' : name,
                'custom:user_type' : userType, 
            }
        }
        console.log(attributes);
        handleSetUserType(attributes);
    }

    const handleChange = (event) => {
        setUserType(event.target.value);
      };
      

    return(
        <Card>
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
                    label="Username/Artist/Venue Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">User Type</FormLabel>
                    <RadioGroup aria-label="user_type" name="user" value={userType} onChange={handleChange}>
                        <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                        <FormControlLabel value="venue" control={<Radio />} label="Venue" />
                        <FormControlLabel value="fan" control={<Radio />} label="Fan" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                {userType === "venue" &&
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Venue Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                }
            </Grid>
            <Button onClick={submitUserAttributes}>Submit</Button>
        </Card>
    )
}

export default SetUser;
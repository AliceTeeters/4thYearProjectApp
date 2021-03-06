import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import CreateEvent from './CreateEvent';


export const props = {
    open: true,
    handleClose: () => { },
    onSubmit: (values) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    },
    isFullScreen: true

};

storiesOf('Dialogs/CreateEvent', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <CreateEvent {...props} />
    ));


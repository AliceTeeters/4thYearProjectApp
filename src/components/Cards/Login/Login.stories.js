import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Login from './Login';

storiesOf('Cards/Login', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <Login/>
    ));
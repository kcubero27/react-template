import React from 'react';
import { text } from '@storybook/addon-knobs';
import { CardElement } from './card.element';

export default { title: 'Card' };

export const element = () => {
    const link = text('Link', 'google.com');
    const description = text('Description', 'Lorem ipsum');

    return <CardElement link={link} description={description} />;
};

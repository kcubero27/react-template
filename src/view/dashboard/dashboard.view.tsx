import React from 'react';
import { CardElement } from '../../component/card';

export const DashboardView = () => {
    const link = 'aRandomLink.com';
    const text = 'Finding customers for your new business';

    return (
        <div>
            <CardElement link={link} description={text} />
        </div>
    );
};

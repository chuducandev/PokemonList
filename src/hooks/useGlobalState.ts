import { SystemError } from '@pokemon/constants';
import { StateContext } from '@pokemon/contexts';
import React from 'react';

export const useGlobalState = () => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new SystemError();
    }
    return context;
};

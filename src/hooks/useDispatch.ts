import { SystemError } from '@pokemon/constants';
import { DispatchContext } from '@pokemon/contexts';
import React from 'react';

export const useDispatch = () => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
        throw new SystemError();
    }
    return context;
};

import { DispatchContextProvider, StateContextProvider } from '@pokemon/contexts';
import { useConst } from '@pokemon/hooks';
import { Home } from '@pokemon/screens';
import { getPokemonListState, pokemonListReducer } from '@pokemon/store';
import React, { ReactElement, useReducer } from 'react';

const MainApp = ({ children }: { children: (ReactElement | null)[] | ReactElement | null }) => {
    const initialState = useConst(getPokemonListState);
    const [state, dispatch] = useReducer(pokemonListReducer(initialState), initialState);

    return (
        <DispatchContextProvider value={dispatch}>
            <StateContextProvider value={state}>{children}</StateContextProvider>
        </DispatchContextProvider>
    );
};

export const App = (): JSX.Element => {
    return (
        <MainApp>
            <Home />
        </MainApp>
    );
};

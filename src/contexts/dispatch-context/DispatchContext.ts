import { PokemonListAction } from '@pokemon/store';
import React from 'react';

type Dispatch = (action: PokemonListAction) => void;

export const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

export const DispatchContextProvider = DispatchContext.Provider;

export const DispatchContextConsumer = DispatchContext.Consumer;

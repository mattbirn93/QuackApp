import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the Character interface
interface Character {
  name: string;
}

// Define the state interface
interface CharacterState {
  CharacterDeck: Character[];
}

// Define the action types
type CharacterAction =
  | { type: 'ADD_CHARACTER'; payload: Character }
  | { type: 'REMOVE_CHARACTER'; payload: string }
  | { type: 'UPDATE_CHARACTER'; payload: { oldName: string; newName: string } };

// Define the context properties
interface CharacterContextProps {
  state: CharacterState;
  dispatch: React.Dispatch<CharacterAction>;
}

// Initialize the state
const initialState: CharacterState = {
  CharacterDeck: [],
};

// Create the context
const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

// Define the reducer function
const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case 'ADD_CHARACTER':
      return { ...state, CharacterDeck: [...state.CharacterDeck, action.payload] };
    case 'REMOVE_CHARACTER':
      return {
        ...state,
        CharacterDeck: state.CharacterDeck.filter(character => character.name !== action.payload),
      };
    case 'UPDATE_CHARACTER':
      return {
        ...state,
        CharacterDeck: state.CharacterDeck.map(character =>
          character.name === action.payload.oldName ? { name: action.payload.newName } : character
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// Create the provider component
export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCharacterContext = (): CharacterContextProps => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};

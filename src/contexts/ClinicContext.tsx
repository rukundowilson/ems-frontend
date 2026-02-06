'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ClinicState {
  user: any;
  appointments: any[];
  treatments: any[];
  loading: boolean;
}

interface ClinicAction {
  type: string;
  payload?: any;
}

const initialState: ClinicState = {
  user: null,
  appointments: [],
  treatments: [],
  loading: false,
};

const clinicReducer = (state: ClinicState, action: ClinicAction): ClinicState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'SET_TREATMENTS':
      return { ...state, treatments: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const ClinicContext = createContext<{
  state: ClinicState;
  dispatch: React.Dispatch<ClinicAction>;
} | null>(null);

export const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(clinicReducer, initialState);

  return (
    <ClinicContext.Provider value={{ state, dispatch }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import caseReducer from './slices/caseSlice';
import documentReducer from './slices/documentSlice';
import appointmentReducer from './slices/appointmentSlice';
import billingReducer from './slices/billingSlice';
import leaveReducer from './slices/leaveSlice';
import reminderReducer from './slices/reminderSlice';
import clientReducer from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cases: caseReducer,
    documents: documentReducer,
    appointments: appointmentReducer,
    billing: billingReducer,
    leaves: leaveReducer,
    reminders: reminderReducer,
    clients: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Case {
  id: number;
  title: string;
  case_number: string;
  client: number;
  status: string;
  description: string;
  assigned_to: number;
  created_at: string;
  updated_at: string;
}

interface CaseState {
  cases: Case[];
  currentCase: Case | null;
  loading: boolean;
  error: string | null;
}

const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: false,
  error: null,
};

export const fetchCases = createAsyncThunk('cases/fetchCases', async () => {
  const response = await axios.get('/api/cases/');
  return response.data;
});

export const fetchCaseById = createAsyncThunk(
  'cases/fetchCaseById',
  async (id: number) => {
    const response = await axios.get(`/api/cases/${id}/`);
    return response.data;
  }
);

export const createCase = createAsyncThunk(
  'cases/createCase',
  async (caseData: Partial<Case>) => {
    const response = await axios.post('/api/cases/', caseData);
    return response.data;
  }
);

export const updateCase = createAsyncThunk(
  'cases/updateCase',
  async ({ id, data }: { id: number; data: Partial<Case> }) => {
    const response = await axios.put(`/api/cases/${id}/`, data);
    return response.data;
  }
);

export const deleteCase = createAsyncThunk(
  'cases/deleteCase',
  async (id: number) => {
    await axios.delete(`/api/cases/${id}/`);
    return id;
  }
);

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCase: (state) => {
      state.currentCase = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cases
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cases';
      })
      // Fetch Case by ID
      .addCase(fetchCaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCase = action.payload;
      })
      .addCase(fetchCaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch case';
      })
      // Create Case
      .addCase(createCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.loading = false;
        state.cases.push(action.payload);
      })
      .addCase(createCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create case';
      })
      // Update Case
      .addCase(updateCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.cases[index] = action.payload;
        }
        if (state.currentCase?.id === action.payload.id) {
          state.currentCase = action.payload;
        }
      })
      .addCase(updateCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update case';
      })
      // Delete Case
      .addCase(deleteCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = state.cases.filter((c) => c.id !== action.payload);
        if (state.currentCase?.id === action.payload) {
          state.currentCase = null;
        }
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete case';
      });
  },
});

export const { clearError, clearCurrentCase } = caseSlice.actions;
export default caseSlice.reducer; 
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { WorkflowSession, Step } from '@/types/workflow';
import { WorkflowStorage } from '@/lib/storage';

/**
 * Application state
 */
interface AppState {
  sessions: WorkflowSession[];
  currentSessionId: string | null;
  isEditMode: boolean;
  isSidebarOpen: boolean;
  isLoading: boolean;
}

/**
 * Action types
 */
type Action =
  | { type: 'SET_SESSIONS'; payload: WorkflowSession[] }
  | { type: 'SELECT_SESSION'; payload: string | null }
  | { type: 'ADD_SESSION'; payload: WorkflowSession }
  | { type: 'UPDATE_SESSION'; payload: { id: string; data: Partial<WorkflowSession> } }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'ADD_STEP'; payload: { sessionId: string; step: Step } }
  | { type: 'UPDATE_STEP'; payload: { sessionId: string; stepId: string; data: Partial<Step> } }
  | { type: 'DELETE_STEP'; payload: { sessionId: string; stepId: string } }
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_LOADING'; payload: boolean };

/**
 * Reducer
 */
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };

    case 'SELECT_SESSION':
      return { ...state, currentSessionId: action.payload };

    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
        currentSessionId: action.payload.session_id,
      };

    case 'UPDATE_SESSION': {
      const sessions = state.sessions.map(session =>
        session.session_id === action.payload.id
          ? { ...session, ...action.payload.data }
          : session
      );
      return { ...state, sessions };
    }

    case 'DELETE_SESSION': {
      const sessions = state.sessions.filter(s => s.session_id !== action.payload);
      let newCurrentId = state.currentSessionId;

      // If deleted session was current, select the first one
      if (state.currentSessionId === action.payload) {
        newCurrentId = sessions.length > 0 ? sessions[0].session_id : null;
      }

      return {
        ...state,
        sessions,
        currentSessionId: newCurrentId,
      };
    }

    case 'ADD_STEP': {
      const sessions = state.sessions.map(session =>
        session.session_id === action.payload.sessionId
          ? { ...session, steps: [...session.steps, action.payload.step] }
          : session
      );
      return { ...state, sessions };
    }

    case 'UPDATE_STEP': {
      const sessions = state.sessions.map(session => {
        if (session.session_id !== action.payload.sessionId) return session;

        return {
          ...session,
          steps: session.steps.map(step =>
            step.id === action.payload.stepId
              ? { ...step, ...action.payload.data }
              : step
          ),
        };
      });
      return { ...state, sessions };
    }

    case 'DELETE_STEP': {
      const sessions = state.sessions.map(session => {
        if (session.session_id !== action.payload.sessionId) return session;

        const steps = session.steps.filter(s => s.id !== action.payload.stepId);
        // Reorder
        steps.sort((a, b) => a.order - b.order).forEach((step, idx) => {
          step.order = idx + 1;
        });

        return { ...session, steps };
      });
      return { ...state, sessions };
    }

    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditMode: !state.isEditMode };

    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

/**
 * Context value type
 */
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;

  // Helper functions
  selectSession: (id: string | null) => void;
  addSession: (data: { title: string; description?: string }) => Promise<void>;
  updateSession: (id: string, data: Partial<WorkflowSession>) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  duplicateSession: (id: string) => Promise<void>;

  addStep: (sessionId: string, step: Omit<Step, 'id' | 'order' | 'timestamp'>) => Promise<void>;
  updateStep: (sessionId: string, stepId: string, data: Partial<Step>) => Promise<void>;
  deleteStep: (sessionId: string, stepId: string) => Promise<void>;

  toggleEditMode: () => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

/**
 * AppProvider
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    sessions: [],
    currentSessionId: null,
    isEditMode: false,
    isSidebarOpen: false,
    isLoading: true,
  });

  // Initialize storage on mount
  useEffect(() => {
    async function init() {
      try {
        await WorkflowStorage.initialize();
        const sessions = WorkflowStorage.getSessions();
        const currentId = WorkflowStorage.getCurrentSessionId();

        dispatch({ type: 'SET_SESSIONS', payload: sessions });
        dispatch({ type: 'SELECT_SESSION', payload: currentId });
      } catch (error) {
        console.error('Failed to initialize storage:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    init();
  }, []);

  // Helper functions
  const selectSession = useCallback((id: string | null) => {
    WorkflowStorage.setCurrentSessionId(id);
    dispatch({ type: 'SELECT_SESSION', payload: id });
  }, []);

  const addSession = useCallback(async (data: { title: string; description?: string }) => {
    const sessionId = WorkflowStorage.addSession(data);
    const newSession = WorkflowStorage.getSession(sessionId);

    if (newSession) {
      dispatch({ type: 'ADD_SESSION', payload: newSession });
    }
  }, []);

  const updateSession = useCallback(async (
    id: string,
    data: Partial<WorkflowSession>
  ) => {
    WorkflowStorage.updateSession(id, data);
    dispatch({ type: 'UPDATE_SESSION', payload: { id, data } });
  }, []);

  const deleteSession = useCallback(async (id: string) => {
    WorkflowStorage.deleteSession(id);
    dispatch({ type: 'DELETE_SESSION', payload: id });
  }, []);

  const duplicateSession = useCallback(async (id: string) => {
    const newId = WorkflowStorage.duplicateSession(id);
    const newSession = WorkflowStorage.getSession(newId);

    if (newSession) {
      dispatch({ type: 'ADD_SESSION', payload: newSession });
    }
  }, []);

  const addStep = useCallback(async (
    sessionId: string,
    step: Omit<Step, 'id' | 'order' | 'timestamp'>
  ) => {
    const stepId = WorkflowStorage.addStep(sessionId, step);
    const session = WorkflowStorage.getSession(sessionId);
    const newStep = session?.steps.find(s => s.id === stepId);

    if (newStep) {
      dispatch({ type: 'ADD_STEP', payload: { sessionId, step: newStep } });
    }
  }, []);

  const updateStep = useCallback(async (
    sessionId: string,
    stepId: string,
    data: Partial<Step>
  ) => {
    WorkflowStorage.updateStep(sessionId, stepId, data);
    dispatch({ type: 'UPDATE_STEP', payload: { sessionId, stepId, data } });
  }, []);

  const deleteStep = useCallback(async (sessionId: string, stepId: string) => {
    WorkflowStorage.deleteStep(sessionId, stepId);
    dispatch({ type: 'DELETE_STEP', payload: { sessionId, stepId } });
  }, []);

  const toggleEditMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_EDIT_MODE' });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const value: AppContextValue = {
    state,
    dispatch,
    selectSession,
    addSession,
    updateSession,
    deleteSession,
    duplicateSession,
    addStep,
    updateStep,
    deleteStep,
    toggleEditMode,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * useApp hook
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

/**
 * Custom hooks for convenience
 */
export function useSessions() {
  const { state } = useApp();
  return state.sessions;
}

export function useCurrentSession() {
  const { state } = useApp();
  return state.sessions.find(s => s.session_id === state.currentSessionId) || null;
}

export function useCurrentSessionId() {
  const { state } = useApp();
  return state.currentSessionId;
}

export function useIsEditMode() {
  const { state } = useApp();
  return state.isEditMode;
}

export function useIsSidebarOpen() {
  const { state } = useApp();
  return state.isSidebarOpen;
}

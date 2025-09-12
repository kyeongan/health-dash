import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

type User = { id: string; name: string } | null;

interface AppState {
  user: User;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  notifications: [],
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...n, id: Math.random().toString(36).slice(2) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  setUser: (user) => set(() => ({ user })),
}));

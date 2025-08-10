export interface UserAuth {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserAuth | null;
  loading: boolean;
  error: string | null;
}

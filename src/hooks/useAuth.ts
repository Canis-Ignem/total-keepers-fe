import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '@/store/store';
import { 
  loginUser, 
  registerUser, 
  socialLogin, 
  logoutUser, 
  getCurrentUser, 
  updateUserProfile,
  initializeAuth,
  clearError 
} from '@/store/authSlice';
import type { 
  LoginCredentials, 
  RegisterCredentials, 
  SocialLoginData, 
  User 
} from '@/types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // Initialize auth on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = async (credentials: LoginCredentials) => {
    const result = await dispatch(loginUser(credentials));
    return result.type === 'auth/login/fulfilled';
  };

  const register = async (credentials: RegisterCredentials) => {
    const result = await dispatch(registerUser(credentials));
    return result.type === 'auth/register/fulfilled';
  };

  const loginWithSocial = async (socialData: SocialLoginData) => {
    const result = await dispatch(socialLogin(socialData));
    return result.type === 'auth/socialLogin/fulfilled';
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  const refreshUser = async () => {
    await dispatch(getCurrentUser());
  };

  const updateProfile = async (profileData: Partial<User>) => {
    const result = await dispatch(updateUserProfile(profileData));
    return result.type === 'auth/updateProfile/fulfilled';
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    
    // Actions
    login,
    register,
    loginWithSocial,
    logout,
    refreshUser,
    updateProfile,
    clearAuthError,
  };
};

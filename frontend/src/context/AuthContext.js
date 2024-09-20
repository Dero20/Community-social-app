import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../data";

const AuthContext = createContext();

const initialStates = {
  user: null,
  token: null,
  isLoggedIn: null,
  authLoading: null,
  error: null,
  errorResponse: null,
};

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const [authState, setAuthState] = useState(initialStates);

  const ResetAuthContext = () => {
    setAuthState({ ...initialStates });
  };

  const Login = async (email, password) => {
    const credentials = {
      email,
      password,
    };
    try {
      ResetAuthContext();
      setAuthState((prevData) => ({
        ...prevData,
        authLoading: true,
      }));
      const apiURL = `${baseURL}/auth/login`;
      const { data } = await axios.post(apiURL, credentials);

      if (data.success) {
        setAuthState((prevData) => ({
          ...prevData,
          token: data.token,
          isLoggedIn: true,
        }));
        await AsyncStorage.setItem("token", data.token);
        await LoadUser();
      }
    } catch (error) {
      console.log("Login Error: ", error);
      setAuthState((prevData) => ({
        ...prevData,
        error: true,
        errorResponse: "",
      }));
    } finally {
      setAuthState((prevData) => ({ ...prevData, authLoading: false }));
    }
  };

  const LoadUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuthState((prevData) => ({ ...prevData, authLoading: true }));
        const apiURL = `${baseURL}/auth/profile`;
        const { data } = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          setAuthState((prevData) => ({
            ...prevData,
            user: data.data,
            isLoggedIn: true,
            token: token,
          }));
          navigation.navigate("HomeNav");
        }
      }
    } catch (error) {
      console.log("Load User Error: ", error);
    } finally {
      setAuthState((prevData) => ({ ...prevData, authLoading: false }));
    }
  }, []);

  const Signup = async (userData) => {
    try {
      const res = await axios.post(`${baseURL}/auth/register`, userData);
      return res.data;
    } catch (error) {
      console.log("Signup error:", error);
      return { error: error.response.data.message };
    }
  };

  const VerifyOTP = async (email, otp) => {
    try {
      const res = await axios.post(`${baseURL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        // Save token and load user after successful OTP verification
        await AsyncStorage.setItem("token", res.data.token);
        setAuthState((prevData) => ({
          ...prevData,
          token: res.data.token,
          isLoggedIn: true,
        }));
        await LoadUser(); // Load user after token is set
      }

      return res.data;
    } catch (error) {
      console.log("Verify OTP error:", error);
      return { error: error.response.data.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      ResetAuthContext();
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  useEffect(() => {
    LoadUser();
  }, [LoadUser]);

  return (
    <AuthContext.Provider
      value={{ ...authState, Login, LoadUser, logout, Signup, VerifyOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

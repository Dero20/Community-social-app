import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";
import { socket } from "../socket";
import { baseURL } from "../data";
import axios from "axios";

const FetchContext = createContext();

const initialStates = {
  posts: [],
  bookmarkedPosts: [],
  postLoading: null,
  jobListing: [],
  jobLoading: null,
  productListing: [],
  productLoading: null,
  inbox: [],
  nearbyUsers: [],
  nearbyUserLoading: null,
  notifications: [],
};

export const FetchProvider = ({ children }) => {
  const [fetchState, setFetchState] = useState(initialStates);
  const { user } = useAuth();

  const getPosts = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: true,
      }));
      const apiURL = `${baseURL}/post/get`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          posts: data.data,
          postLoading: false,
        }));
      } else {
        setFetchState((prevData) => ({
          ...prevData,
          postLoading: false,
        }));
      }
    } catch (error) {
      console.log("Error in getPosts: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: false,
      }));
    }
  };
  const getInbox = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: true,
      }));
      const apiURL = `${baseURL}/chat/inbox`; // Make sure the endpoint matches your updated backend route
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          inbox: data.data,
          postLoading: false,
        }));
      } else {
        setFetchState((prevData) => ({
          ...prevData,
          postLoading: false,
        }));
      }
    } catch (error) {
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: false,
      }));
    }
  };
  const getJobListings = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        jobLoading: true,
      }));
      const apiURL = `${baseURL}/jobs/get`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          jobListing: data.data,
          jobLoading: false,
        }));
      } else {
        setFetchState((prevData) => ({
          ...prevData,
          jobLoading: false,
        }));
      }
    } catch (error) {
      console.log("Error in getPosts: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: false,
      }));
    }
  };
  const getProducts = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        productLoading: true,
      }));
      const apiURL = `${baseURL}/product/get`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          productListing: data.data,
          productLoading: false,
        }));
      }
    } catch (error) {
      console.log("Error in getPosts: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        productLoading: false,
      }));
    }
  };
  const getSingleUser = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const apiURL = `${baseURL}/auth/single-profile/${id}`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.log("Error in Get single user: ", error);
    }
  };
  const getProductById = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const apiURL = `${baseURL}/product/get-product/${id}`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.log("Error in Get single user: ", error);
    }
  };
  const getBookMarkedPosts = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: true,
      }));
      const apiURL = `${baseURL}/post/get-bookmarks`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          bookmarkedPosts: data.data,
          postLoading: false,
        }));
      } else {
        setFetchState((prevData) => ({
          ...prevData,
          postLoading: false,
        }));
      }
    } catch (error) {
      console.log("Error in getPosts: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        postLoading: false,
      }));
    }
  };
  const getNearbyUsers = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setFetchState((prevData) => ({
        ...prevData,
        nearbyUserLoading: true,
      }));
      const apiURL = `${baseURL}/auth/nearby`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          nearbyUsers: data.data,
          nearbyUserLoading: false,
        }));
      } else {
        setFetchState((prevData) => ({
          ...prevData,
          nearbyUserLoading: false,
        }));
      }
    } catch (error) {
      console.log("Error in Nearby Users: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        nearbyUserLoading: false,
      }));
    }
  };
  const getNotifications = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const apiURL = `${baseURL}/auth/notifications`;
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFetchState((prevData) => ({
          ...prevData,
          notifications: data.data,
        }));
      }
    } catch (error) {
      console.log("Error in Nearby Users: ", error);
      setFetchState((prevData) => ({
        ...prevData,
        nearbyUserLoading: false,
      }));
    }
  };

  useEffect(() => {
    user && getPosts();
    user && getJobListings();
    user && getInbox();
    user && getProducts();
    user && getBookMarkedPosts();
    user && getNearbyUsers();
    user && getNotifications(user._id);
    if (user) {
      socket.emit("join", user._id);
    }
  }, [user]);

  return (
    <FetchContext.Provider
      value={{
        ...fetchState,
        getPosts,
        getJobListings,
        getInbox,
        getProducts,
        getSingleUser,
        getProductById,
        getBookMarkedPosts,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  return useContext(FetchContext);
};

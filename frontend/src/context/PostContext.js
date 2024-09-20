import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { baseURL } from "../data";
import axios from "axios";
import { useFetch } from "./FetchContext";
import { useNavigation } from "@react-navigation/native";

const PostContext = createContext();

const initialStates = {
  posts: [],
  postLoading: null,
  jobListing: [],
  jobLoading: null,
  productListing: [],
  productLoading: null,
  inbox: [],
};

export const PostProvider = ({ children }) => {
  const [postState, setPostState] = useState(initialStates);
  const { token } = useAuth();
  const { getJobListings, getPosts, getProducts } = useFetch();

  const navigation = useNavigation();

  const postJob = async (formData) => {
    try {
      const apiURL = `${baseURL}/jobs/create`;
      const { data } = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log("job post SUCESS DATA: ", data);
        await getJobListings();
        navigation.navigate("Jobs");
      }
    } catch (error) {
      console.log("Error in Create job post: ", error);
    }
  };
  const createPost = async (formData) => {
    console.log("Post Data: ", formData);

    try {
      const apiURL = `${baseURL}/post/create`;
      const { data } = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        await getPosts();
        console.log("new post SUCESS DATA: ", data);
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.log("Error in Create new post: ", error);
    }
  };
  const createEvent = async (formData) => {
    console.log(formData);

    try {
      const apiURL = `${baseURL}/post/new-event`;
      const { data } = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        await getPosts();
        console.log("new event SUCESS DATA: ", data);
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.log("Error in event: ", error);
    }
  };
  const createProduct = async (formData) => {
    try {
      const apiURL = `${baseURL}/product/create`;
      const { data } = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        await getProducts();
        console.log("new event SUCESS DATA: ", data);
        navigation.navigate("Shop");
      }
    } catch (error) {
      console.log("Error in event: ", error);
    }
  };
  const commentOnPost = async (formData) => {
    try {
      const apiURL = `${baseURL}/post/comment`;
      const { data } = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { type: "success", data: data };
    } catch (error) {
      console.log("Error in event: ", error);
      return { type: "failed" };
    }
  };
  const likePost = async (id) => {
    try {
      const apiURL = `${baseURL}/post/like/${id}`;
      const { data } = await axios.put(
        apiURL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getPosts();

      return { type: "success" };
    } catch (error) {
      console.log("Error in Create like post: ", error);
      return { type: "failed" };
    }
  };
  const bookmarkPost = async (id) => {
    try {
      const apiURL = `${baseURL}/post/bookmark/${id}`;
      const { data } = await axios.put(
        apiURL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getPosts();

      return { type: "success" };
    } catch (error) {
      console.log("Error in Create like post: ", error);
      return { type: "failed" };
    }
  };

  return (
    <PostContext.Provider
      value={{
        postJob,
        createPost,
        likePost,
        createEvent,
        bookmarkPost,
        createProduct,
        commentOnPost,
        ...postState,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};

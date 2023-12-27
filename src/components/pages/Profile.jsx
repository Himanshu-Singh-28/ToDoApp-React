import React, { useContext} from "react";
import { context } from "../../main";
import Loader from "../Header/Loader";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { User, isAuthenticated, Loading } = useContext(context);
  if (!isAuthenticated) {
    toast.error("Login First");
    return <Navigate to={"/login"}></Navigate>;
  }
  return Loading ? (
    <Loader />
  ) : (
    <>
      <div className="user-container">
        <h1 style={{ color: "blue" }}>Name: {User?.name}</h1>
        <h3> Email: {User?.email}</h3>
        <h4>LastLogin AT: {Date(User?.createdAt)}</h4>
      </div>
      
    </>
  );
};

export default Profile;

import axios from "axios";
export const register = async (user) => {    
    return await axios.post("/user/register", user);
  };

import axios from "axios";
export const login = async (user) => {    
    return await axios.post("/user/login", user);
  };

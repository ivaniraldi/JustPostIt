
const responseInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use((response) => {
    //Response Successful
    // console.log("Response en base ",response);
    return response;
  },(error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        console.log({error});
        alert("Session expired, please login again");
        window.location.href = "/login";
       } else {
       console.log({error}); 
        alert(error);
      }
    });
    };
    export default responseInterceptors;
const BACKEND_URL = "https://fastapi-backend.siddheshmungeka.repl.co/"
export default BACKEND_URL;

const getUpdates = async (complaintId) => {
    const url = `${BACKEND_URL}authority/councillor/get_updates?complaint_id=${complaintId}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  };

  export{
    getUpdates,
    
  }
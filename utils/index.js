const BACKEND_URL = "https://fastapi-backend.siddheshmungeka.repl.co/"
export default BACKEND_URL;
import axios from "axios";
const getUpdates = async (complaintId) => {
    const url = `${BACKEND_URL}authority/councillor/get_updates?complaint_id=${complaintId}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  };

  const getCouncillorUpdates = async (complaintId) => {
    const url = `${BACKEND_URL}authority/councillor/status_from_councillor?complaint_id=${complaintId}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
    };

  export{
    getUpdates,
    getCouncillorUpdates
  }
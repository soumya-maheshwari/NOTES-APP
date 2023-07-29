import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/",
  // baseURL: "https://notesapp-c9ic.onrender.com/api/",
});

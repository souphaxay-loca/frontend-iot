import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3999/api",
});

export const sensorService = {
  async getSensorData(params) {
    try {
      const response = await api.get("/sensor-data", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      throw error;
    }
  },
  async postSensorData(data) {
    try {
      const response = await api.post("/sensor-data", data);
      return response.data;
    } catch (error) {
      console.error("Error posting sensor data:", error);
      throw error;
    }
  },
};

import axios from "axios";

const serverURL = "http://localhost:4000";
const axiosConfig = {
  headers: {},
};

const tripAPI = {
  getOneTrip: async (trip_id: number) => {
    try {
      const response = await axios.get(
        `${serverURL}/trips?trip_id=${trip_id}`,
        axiosConfig
      );
      return response.data[0];
    } catch (err) {
      throw console.error(err);
    }
  },
  getTripsByUser: async (user_id: number) => {
    try {
      const response = await axios.get(
        `${serverURL}/trips?user_id=${user_id}`,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  createTrip: async (newTrip: any) => {
    const body = {
      organizer_id: newTrip.organizer_id,
      name: newTrip.name,
      start_date: newTrip.start_date,
      end_date: newTrip.end_date,
      description: newTrip.description,
    };

    try {
      const response = await axios.post(
        `${serverURL}/trips`,
        body,
        axiosConfig
      );
      return;
    } catch (err) {
      throw console.error(err);
    }
  },
  updateTrip: async (trip_id: number, tripDetails: any) => {
    const body = {
      organizer_id: tripDetails.organizer_id,
      name: tripDetails.name,
      start_date: tripDetails.start_date,
      end_date: tripDetails.end_date,
      description: tripDetails.description,
    };

    try {
      const response = await axios.put(
        `${serverURL}/trips/${trip_id}`,
        body,
        axiosConfig
      );
      return;
    } catch (err) {
      throw console.error(err);
    }
  },
  changeTripAttending: async (
    user_id: number,
    trip_id: number,
    attending: string
  ) => {
    try {
      const response = await axios.put(
        `${serverURL}/trips/${trip_id}/attending?user_id=${user_id}`,
        { attending },
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  addHousing: async (trip_id: number, newHousing: any) => {
    const body = {
      name: newHousing.name,
      photo: newHousing.photo,
      link: newHousing.link,
      description: newHousing.description,
    };

    try {
      const response = await axios.post(
        `${serverURL}/trips/${trip_id}/housing`,
        body,
        axiosConfig
      );
      return;
    } catch (err) {
      throw console.error(err);
    }
  },
};
export default tripAPI;

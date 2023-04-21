import axios from "axios";

const serverURL = "http://localhost:4000";
const axiosConfig = {
  headers: {},
};

const eventAPI = {
  getEvent: async (event_id: number) => {
    try {
      const response = await axios.get(
        `${serverURL}/events?event_id=${event_id}`,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  postEvent: async (newEvent: any) => {
    const body = {
      trip_id: newEvent.trip_id,
      name: newEvent.name,
      start_date: newEvent.start_date,
      end_date: newEvent.end_date,
      description: newEvent.description,
    };
    try {
      const response = await axios.post(
        `${serverURL}/events`,
        body,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  getEventsByUser: async (user_id: number) => {
    try {
      const response = await axios.get(
        `${serverURL}/events?user_id=${user_id}`,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  getEventsByTrip: async (trip_id: number) => {
    try {
      const response = await axios.get(
        `${serverURL}/events?trip_id=${trip_id}`,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
  changeEventAttending: async (
    user_id: number,
    event_id: number,
    attending: string
  ) => {
    try {
      const response = await axios.put(
        `${serverURL}/events/${event_id}/attending?user_id=${user_id}`,
        { attending },
        axiosConfig
      );
      return response.data;
    } catch (err) {
      throw console.error(err);
    }
  },
};
export default eventAPI;

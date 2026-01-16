import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   dateAndTime: "",
   weather: {
      name: "",
      number: null,
      description: "",
      min: null,
      max: null,
      icon: null,
   },
   isLoading: false,
   rejected: false,
};
// thunk function
export const fetchWeather = createAsyncThunk(
   "weatherAPI/fetchWeather",
   async (lang = "en") => {
      const response = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?lat=34.9344&lon=-2.3236&appid=420f571860c8ea9e5cb30386487cece3&lang=${lang}`
      );
      const responseTemp = Math.round(response.data.main.temp - 272.15);
      const min = Math.round(response.data.main.temp_min - 272.15);
      const max = Math.round(response.data.main.temp_max - 272.15);
      const description = response.data.weather[0].description;
      const responseIcon = response.data.weather[0].icon;
      return {
         name: response.data.name,
         number: responseTemp,
         min: min,
         max: max,
         description: description,
         icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
      };
   }
);

export const weatherAPISlice = createSlice({
   name: "weatherAPI",
   initialState: initialState,
   reducers: {
      changeLanguage: (state, action) => {
         state.dateAndTime = action.payload;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(fetchWeather.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(fetchWeather.fulfilled, (state, action) => {
            state.isLoading = false;
            state.weather = action.payload;
         })
         .addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false;
            state.rejected = true;
         });
   },
});

export const { changeLanguage } = weatherAPISlice.actions;
export default weatherAPISlice.reducer;

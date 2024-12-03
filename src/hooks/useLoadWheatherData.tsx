import { useState, useMemo } from 'react';

import useGeolocation from './useGeolocation';
import axios from 'axios';
import moment from 'moment';
import { getItem, setItem, removeItem } from '../utils/Cache';

export default function useLoadWheatherData() {
  const { latitude, longitude, loading: geoLoading, forceReload: geoForceReload } = useGeolocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({}) as any;
  const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date().getTime());

  const forceReload = () => {
    removeItem('weatherData');
    setData({});
    setLastUpdatedAt(new Date().getTime());
    geoForceReload();
  };

  useMemo(() => {
    const loadWeather = async () => {
      setLoading(true);
      if (getItem('weatherData') !== null) {
        setData(getItem('weatherData'));
        setLoading(false);
        return;
      }

      axios
        .get(
          `${process.env.REACT_APP_WEATHER_API_BASE_URL}/forecast/?lat=${latitude || -22.9068467}&lon=${longitude || -43.1728965}&units=metric&lang=pt_br&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
        )
        .then((response) => {
          console.log('BUSCANDO');
          const groupedByWeatherData = response.data.list.reduce((acc: any, curr: any) => {
            const date = moment(curr.dt_txt).format('YYYY-MM-DD');
            if (!acc[date]) {
              acc[date] = { list: [], temp: { min: 99, max: 0, list: [] }, weather: { list: [], average: {} } };
            }
            acc[date].list.push(curr);
            acc[date].temp.min = Math.min(acc[date].temp.min, curr.main.temp_min);
            acc[date].temp.max = Math.max(acc[date].temp.max, curr.main.temp_max);
            acc[date].weather.list.push(curr.weather[0]);
            return acc;
          }, {});

          response.data.list = groupedByWeatherData;
          response.data.lastUpdatedAt = lastUpdatedAt;
          setData(response.data);
          setItem('weatherData', response.data, 4000);
        })
        .catch((_) => {
          console.log('ERRO');
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadWeather();
  }, [latitude, longitude, lastUpdatedAt]);

  return { data, loading: loading || geoLoading, forceReload };
}

import { useState, useEffect } from 'react';
import moment from 'moment';

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(-22.9068467);
  const [long, setLong] = useState(-43.1728965);
  const [weatherData, setWeatherData] = useState({}) as any;

  const getItem = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      console.log('REMOVE POR EXP');
      console.log(now, moment(item.expiry));
      localStorage.removeItem(key);
      return null;
    }
    if (!Object.values(item.value).length) {
      console.log('Vazio');
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const loadWeather = async () => {
    setLoading(true);
    if (getItem('weatherData') !== null) {
      console.log('carrega do local');
      console.log(getItem('weatherData'));
      setWeatherData(getItem('weatherData'));
      setLoading(false);
      return;
    }
    console.log('CARREGA DADOS');
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    await fetch(
      // `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
      `${process.env.REACT_APP_WEATHER_API_BASE_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&lang=pt_br&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
    )
      .then((res) => res.json())
      .then((result) => {
        const groupedByWeatherData = result.list.reduce((acc: any, curr: any) => {
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

        result.list = groupedByWeatherData;
        setWeatherData(result);
        const expiry = new Date().getTime() + 4000 * 60 * 60;
        localStorage.setItem('weatherData', JSON.stringify({ value: result, expiry }));
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWeather();
  }, [lat, long]);
  return !loading ? (
    <>
      <div className="row weather">
        <div className="col text-left">
          <p>{weatherData.city.name}</p>
        </div>
      </div>
      <div className="row weather">
        {Object.keys(weatherData.list).map(
          (dt: string, i: any) =>
            i <= 3 && (
              <div className="col" key={`weather-${i}`}>
                <p className="text-small m-0">
                  {moment().format('YYYY-MM-DD') === dt ? 'Hoje' : moment(dt).format('ddd')}
                </p>
                <img
                  src={`${process.env.REACT_APP_WEATHER_ICON_URL}/${weatherData.list[dt].weather.list[Number.parseInt((weatherData.list[dt].weather.list.length / 2).toString())]?.icon}.png`.replace(
                    'n.png',
                    'd.png',
                  )}
                  alt={
                    weatherData.list[dt].weather.list[
                      Number.parseInt((weatherData.list[dt].weather.list.length / 2).toString())
                    ]?.description
                  }
                />
                <p className="text-small m-0">
                  {
                    weatherData.list[dt].weather.list[
                      Number.parseInt((weatherData.list[dt].weather.list.length / 2).toString())
                    ]?.description
                  }
                </p>
                <p className="text-small">
                  {`${weatherData.list[dt].temp.min.toFixed()}°C | ${weatherData.list[dt].temp.max.toFixed()}°C`}
                </p>
              </div>
            ),
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Weather;

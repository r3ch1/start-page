import React from 'react';
import Loading from '../../Components/Loading';
import moment from 'moment';
import useLoadWheatherData from '../../hooks/useLoadWheatherData';

const Weather = () => {
  const { data: weatherData, loading: geoLoading, forceReload } = useLoadWheatherData();
  return (
    <>
      <Loading isLoading={geoLoading} />
      {!geoLoading && Object.values(weatherData).length && (
        <>
          <div className="row weather">
            <div className="col text-left">{weatherData.city.name}</div>
            <div className="col text-right">
              <button className="btn btn-sm btn-outline-primary" onClick={() => forceReload()}>
                <i className={`fa-solid fa-rotate`} />
              </button>
            </div>
          </div>
          <div className="row weather">
            {/* {JSON.stringify(weatherData)} */}
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
      )}
    </>
  );
};

export default Weather;

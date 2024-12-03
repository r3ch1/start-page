import { useEffect, useState } from 'react';

export default function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus]: any = useState(null);
  const [latitude, setLatitude]: any = useState(null);
  const [longitude, setLongitude]: any = useState(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date().getTime());

  const forceReload = () => {
    setLastUpdatedAt(new Date().getTime());
  };

  useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
        },
        (e) => {
          console.error(e);
          setStatus('Unable to retrieve your location');
          setLoading(false);
        },
      );
    }
  }, [lastUpdatedAt]);

  return { latitude, longitude, status, loading, forceReload };
}

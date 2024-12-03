import { EscalaFintools, Weather } from '../components';
import Gmail from '../Modules/Gmail';
import WeatherOld from '../Modules/Weather';

export default function useUserConfigs() {
  const boxes = [
    // { name: 'Wheather', component: <WeatherOld />, active: true, col: 'left' },
    { name: 'Wheather', component: <Weather />, active: true, col: 'left' },
    { name: 'Gmail', component: <Gmail />, active: true, col: 'center' },
    // { name: 'Escala Fintools', component: <EscalaFintools />, active: true, col: 'right' },
  ];
  return {
    boxes,
  };
}

import moment from 'moment';

export function getItem(key: string) {
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
}

export function setItem(key: string, value: any, expiry: number = 1000) {
  const expiryInMs = new Date().getTime() + expiry * 60 * 60;
  localStorage.setItem(key, JSON.stringify({ value, expiry: expiryInMs }));
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}

// export default {
//   validate,
//   generate,
// };
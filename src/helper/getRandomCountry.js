import countries from '../data/countryList';

export default (() => {
  return countries[Math.floor(Math.random() * countries.length)];
})
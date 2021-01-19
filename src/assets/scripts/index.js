import '../styles/reset.css';
import '../styles/style.css';
import App from './App.js';

const imagesContext = require.context('../images', true, /.(png|svg)$/);
const imagesObj = {};
imagesContext.keys().forEach((key) => {
  const code = key.split('./').pop()
    .substring(0, key.length - 6);
  imagesObj[code] = imagesContext(key);
});
export default imagesObj;

const app = new App();
app.init();

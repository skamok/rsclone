import '../styles/reset.css';
import '../styles/style.css';
import AuthorizationPage from './AuthorizationPageCreation.js';

const imagesContext = require.context('../images', true, /.(png|svg)$/);
const imagesObj = {};
imagesContext.keys().forEach((key) => {
  const code = key.split('./').pop()
    .substring(0, key.length - 6);
  imagesObj[code] = imagesContext(key);
});

export default imagesObj;

const authorizationPage = new AuthorizationPage();
authorizationPage.createAuthorizationPage();

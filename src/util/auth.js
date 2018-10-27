import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

const validateFunc = async () => {
  const keys = await window.fetch(`${process.env.BACKEND_ROOT_URL}/.well-known/jwks.json`, null)
    .then((r) => r.json());
  const key = jwkToPem(keys.keys[0]);
  const accessToken = window.localStorage.getItem('access_token');
  return jwt.verify(accessToken, key);
};

export default validateFunc;

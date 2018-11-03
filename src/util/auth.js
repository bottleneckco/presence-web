import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { backendFetch } from './fetch';

const validateToken = async (token) => {
  const keys = await backendFetch('/.well-known/jwks.json', null)
    .then((r) => r.json());
  const key = jwkToPem(keys.keys[0]);
  return jwt.verify(token, key);
};

export default validateToken;

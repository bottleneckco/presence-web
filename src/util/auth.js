import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

const validateToken = async (token) => {
  const keys = await window.fetch(`${process.env.BACKEND_ROOT_URL}/.well-known/jwks.json`, null)
    .then((r) => r.json());
  const key = jwkToPem(keys.keys[0]);
  return jwt.verify(token, key);
};

export default validateToken;

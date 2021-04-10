import { randomBytes, createHash } from 'crypto';
import { encode } from 'querystring';

import { AUTH_CLIENT_ID, AUTH_HOMEBRIDGE_ID } from '../constants';

export const base64URLEncode = (str: Buffer) => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const generateCodeVerifier = () => base64URLEncode(randomBytes(32));

export const createSHA256Hash = (verifier: string) => {
  return createHash('sha256').update(verifier).digest();
};

export const createChallenge = (hash: Buffer) => base64URLEncode(hash);

export const generateAuthorizeURL = (code_challenge: string) => {
  const params = {
    code_challenge_method: 'S256',
    register: 'false',
    code_challenge,
    prompt: 'login',
    redirect_uri:
      'au.com.agl.mobile://secure.agl.com.au/ios/au.com.agl.mobile/callback',
    client_id: AUTH_CLIENT_ID,
    audience: 'https://api.platform.agl.com.au/',
    auth0Client: AUTH_HOMEBRIDGE_ID,
  };

  return `https://secure.agl.com.au/authorize?${encode(params)}`;
};

import { AUTH_CLIENT_ID, AUTH_HOMEBRIDGE_ID } from '../../constants';
import {
  base64URLEncode,
  createChallenge,
  generateAuthorizeURL,
  generateCodeVerifier,
} from '../auth';

describe('util/auth', () => {
  describe('base64URLEncode', () => {
    test('should produce correct output', () => {
      const buffer = Buffer.from('abcdefg');

      expect(base64URLEncode(buffer)).toEqual('YWJjZGVmZw');
    });
  });

  describe('generateCodeVerifier', () => {
    test('should produce a base64URL from 32 random bytes', () => {
      const base64 = generateCodeVerifier();

      expect(base64).toHaveLength(43);
    });
  });

  describe('createChallenge', () => {
    test('should return a base64 encoded string from input', () => {
      const input = Buffer.from('the input');
      const base64 = createChallenge(input);

      expect(base64).toEqual(Buffer.from(input).toString('base64'));
    });
  });

  describe('generateAuthorizeURL', () => {
    test('should produce a valid authorize URL', () => {
      const encodedHomebridgeID = encodeURIComponent(AUTH_HOMEBRIDGE_ID);

      expect(generateAuthorizeURL('abcd')).toBe(
        // eslint-disable-next-line max-len
        `https://secure.agl.com.au/authorize?code_challenge_method=S256&register=false&code_challenge=abcd&prompt=login&redirect_uri=au.com.agl.mobile%3A%2F%2Fsecure.agl.com.au%2Fios%2Fau.com.agl.mobile%2Fcallback&client_id=${AUTH_CLIENT_ID}&audience=https%3A%2F%2Fapi.platform.agl.com.au%2F&auth0Client=${encodedHomebridgeID}`
      );
    });
  });
});

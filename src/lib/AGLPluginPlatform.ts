import {
  Service,
  Characteristic,
  Logger,
  PlatformConfig,
  API,
} from 'homebridge';
import fs from 'fs';

import {
  createChallenge,
  createSHA256Hash,
  generateAuthorizeURL,
  generateCodeVerifier,
} from '../util/auth';

import AGLPluginMetre from './AGLPluginMetre';

class AGLPluginPlatform {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap
    .Characteristic;

  // this is used to track restored cached accessories
  public readonly accessories: AGLPluginMetre[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API
  ) {
    log.debug('AGL Plugin initialised');

    api.on('didFinishLaunching', () => {
      if (!config.refreshToken) {
        log.info(
          `Authorize the app by logging in here & copy the "code" from the redirect: ${generateAuthorizeURL}`
        );
      }
      log.debug('didFinishLaunching callback');

      // TODO: Create metres from the authorised account
    });
  }

  configureAccessory(metre: AGLPluginMetre) {
    this.accessories.push(metre);
  }

  private createMetres() {
    const aglAccountNumber = this.config.aglAccountNumber;

    const monthMetreExists = Boolean(
      this.accessories.find((a) => {
        return (
          a.aglAccountNumber === aglAccountNumber && a.metreType === 'month'
        );
      })
    );

    const yesterdayMetreExists = Boolean(
      this.accessories.find((a) => {
        return (
          a.aglAccountNumber === aglAccountNumber && a.metreType === 'yesterday'
        );
      })
    );

    if (!monthMetreExists) {
    }
  }

  private async authorizeApp() {
    const verifier = generateCodeVerifier();
    const sha256Challenge = createSHA256Hash(verifier);
    const base64Challenge = createChallenge(sha256Challenge);

    const authorizeUrl = generateAuthorizeURL(base64Challenge);

    this.log.info(`Login & copy response code from redirect: ${authorizeUrl}`);
  }
}

export default AGLPluginPlatform;

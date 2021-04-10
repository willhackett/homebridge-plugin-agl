import { PlatformAccessory, Service } from 'homebridge';

import AGLPluginPlatform from './AGLPluginPlatform';

class AGLPluginMetre {
  private service: Service;

  aglAccountNumber: string;
  metreType: 'month' | 'yesterday';

  constructor(
    private readonly platform: AGLPluginPlatform,
    private readonly accessory: PlatformAccessory
  ) {}
}

export default AGLPluginMetre;

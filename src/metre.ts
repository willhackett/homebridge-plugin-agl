import { PlatformAccessory, Service } from 'homebridge';

class Metre {
  private service: Service;

  constructor(
    private readonly platform: AGLHomebridgePlatform,
    private readonly accessory: PlatformAccessory
  ) {}
}

export default Metre;

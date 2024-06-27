export class GetConfigByNameDto {
  constructor(data: Object) {
    this.config = data['config'];
    this.serviceName = data['serviceName'];
  }
  config: Object;
  serviceName: string;
}

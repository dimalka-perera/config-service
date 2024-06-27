import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './interfaces/config.interface';
import { Model } from 'mongoose';
import * as b from 'bcrypt';
import { GetConfigByNameDto } from './dto/get-config-by-name.dto';
import { LoggerService } from 'src/util/logger/logger.service';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_MODEL') private configModel: Model<Config>, private _logger: LoggerService) {}

  async create(createConfigDto: CreateConfigDto) {
    let encryptedSecret: string;
    if (createConfigDto.secret) {
      encryptedSecret = await this.encryptSecret(
        createConfigDto.secret.toString(),
      );
    }
    try {
      await this.configModel.validate(createConfigDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const createdConfig = new this.configModel({
      ...createConfigDto,
      serviceName: String(createConfigDto.serviceName).toLowerCase(),
      secret: encryptedSecret,
    });
    return createdConfig.save();
  }

  async encryptSecret(secret: string) {
    const salt = await b.genSalt(3);
    return b.hash(secret, salt);
  }

  async compareSecret(value: string, encrypted: string) {
    return b.compare(value, encrypted);
  }

  findAll() {
    return this.configModel.find();
  }

  async findByServiceName(serviceName: string, secret: string = null): Promise<GetConfigByNameDto> {
    this._logger.info(`Finding configs for ${serviceName} with secret ${secret}`)
    let valid = false;
    const data = await this.configModel.findOne({
      serviceName,
    });
    if (data.secret && secret) {
      valid = await this.compareSecret(secret, data.secret.toString());
      
    }
    if (data.secret && !valid) throw new UnauthorizedException();
    delete data.secret
    return new GetConfigByNameDto(data);
  }

  findOneById(id: string) {
    return this.configModel.findById(id);
  }

  async update(id: string, updateConfigDto: UpdateConfigDto) {
    const excistingData = await this.findOneById(id);
    if (updateConfigDto.serviceName != excistingData.serviceName) {
      throw new BadRequestException(
        `Editing service name not allowed. Delete the old service and create a new entry.`,
      );
    }
    return this.configModel.findByIdAndUpdate(id, updateConfigDto);
  }

  remove(id: string) {
    return `This action removes a #${id} config`;
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './interfaces/config.interface';
import { Model } from 'mongoose';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_MODEL') private configModel: Model<Config>) {}

  async create(createConfigDto: CreateConfigDto) {
    try {
      await this.configModel.validate(createConfigDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const createdConfig = new this.configModel({
      ...createConfigDto,
      serviceName: String(createConfigDto.serviceName).toLowerCase(),
    });
    return createdConfig.save();
  }

  findAll() {
    return this.configModel.find();
  }

  findByServiceName(serviceName: string){
    return this.configModel.findOne({
      serviceName
    })
  }

  findOneById(id: string) {
    return this.configModel.findById(id)
  }

  async update(id: string, updateConfigDto: UpdateConfigDto) {
    
    const excistingData = await this.findOneById(id)
    if(updateConfigDto.serviceName!=excistingData.serviceName){
      throw new BadRequestException(`Editing service name not allowed. Delete the old service and create a new entry.`)
    }
    return this.configModel.findByIdAndUpdate(id,updateConfigDto)
  }

  remove(id: string) {
    return `This action removes a #${id} config`;
  }
}

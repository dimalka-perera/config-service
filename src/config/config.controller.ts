import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @Get()
  findAll() {
    return this.configService.findAll();
  }

  @Get(':serviceName')
  findOne(@Param('serviceName') serviceName: string) {
    return this.configService.findByServiceName(serviceName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configService.update(id, updateConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configService.remove(id);
  }
}

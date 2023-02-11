import { IDataMapper } from 'apps/libs/common/infrastructure/mapper/base.mapper';
import { RepositoryPort } from 'apps/libs/common/port/repository.ports';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Model } from 'mongoose';

export abstract class MongodbBaseRepository<Entity extends AggregateRoot, Schema, Doc>
  implements RepositoryPort<Entity>
{
  protected readonly logger: Logger = new Logger(this.constructor.name);

  protected constructor(private readonly Model: Model<Doc>, private readonly Mapper: IDataMapper<Entity, Schema>) {}

  async save(entity: Entity): Promise<string | undefined> {
    try {
      const data: Schema = this.Mapper.toData(entity);
      const schemaDto = new this.Model(data);

      await schemaDto.save();

      return data['_id'];
    } catch (e) {
      this.logger.error(e);
      return undefined;
    }
  }

  async findOne(id: number | string, key: string, populate = ''): Promise<Entity | undefined> {
    try {
      const opt = {};
      opt[key] = id;

      const data: Schema | undefined = (await this.Model.findOne(opt).populate(populate)) as Schema;

      if (!data) {
        return undefined;
      }

      return this.Mapper.toEntity(data);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async get(): Promise<Entity[]> {
    try {
      const data: Schema[] | undefined = (await this.Model.find()) as Schema[];

      return data.map((current: Schema) => this.Mapper.toEntity(current));
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findByQuery(
    populate = '',
    seleted = '',
    start = '',
    end = '',
  ): Promise<Entity[]> {
    try {
      let data: Schema[] | undefined;

      if (start && end) {
        data = await this.Model.find({ createdAt: { $gte: start, $lte: end } }).populate(populate, seleted);
      } else {
        data = await this.Model.find().populate(populate, seleted);
      }

      return data.map((current: Schema) => this.Mapper.toEntity(current));
    } catch (e) {
      this.logger.error(e);
    }
  }

  async updateOne(payload: Entity): Promise<void> {
    try {
      const data: Schema = this.Mapper.toData(payload);

      await this.Model.updateOne({ _id: data['_id'] }, { $set: { ...data, updatedAt: new Date() } });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async delete(entity: Entity): Promise<void> {
    console.log('not imple')
  }
}

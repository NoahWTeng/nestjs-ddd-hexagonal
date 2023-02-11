import { BaseEntity } from '@libs/common/domain/base.entity';
import { BaseSchema } from '../dao/base.schema';

export interface IDataMapper<Entity, Data> {
  toEntity(data: Data): Entity;
  toData(entity: Entity): Data;
}

export class BaseMapper {
  toDataBase(entity: BaseEntity): BaseSchema {
    return {
      _id: entity.baseProperties._id,
      createdAt: entity.baseProperties.createdAt,
      updatedAt: entity.baseProperties.updatedAt,
      version: entity.baseProperties.version,
    };
  }
  toEntityBase(data: BaseSchema): BaseEntity {
    return new BaseEntity({
      _id: data._id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      version: data.version,
    });
  }
}

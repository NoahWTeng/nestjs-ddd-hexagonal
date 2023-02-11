import { AggregateRoot } from '@nestjs/cqrs';
import mongoose from 'mongoose';

export interface IBaseEntity {
  _id: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity extends AggregateRoot {
  private _id: string 

  private readonly createdAt: Date 

  private updatedAt: Date 

  private version = 1;

  constructor(props: IBaseEntity) {
    super();
    Object.assign(this, props);
  }

  public get baseProperties(): IBaseEntity {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version,
    };
  }

  public get newId(): string {
    return this._id;
  }

  public setUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  public static create(): BaseEntity {
    return new BaseEntity({
      _id: new mongoose.Types.ObjectId().toHexString(),
      createdAt: new Date(),
      updatedAt:new Date(),
      version: 1,
    })
  }



}

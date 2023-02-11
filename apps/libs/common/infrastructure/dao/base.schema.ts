import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseSchema {
  @ApiProperty({
    type: String,
    description: 'Id of the base schema',
  })
  @IsString()
  @IsNotEmpty()
  readonly _id!: string;

  @ApiProperty({
    type: Date,
    description: 'Created at of the base schema',
  })
  @IsDate()
  @IsNotEmpty()
  readonly createdAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated at of the base schema',
  })
  @IsDate()
  @IsNotEmpty()
  readonly updatedAt!: Date;

  @ApiProperty({
    type: Number,
    description: 'Version of the base schema',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly version!: number;
}

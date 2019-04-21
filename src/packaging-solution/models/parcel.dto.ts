import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ParcelDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({
        description: 'The length of the parcel in millimetres',
        example: 300,
    })
    readonly length: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({
        description: 'The breadth of the parcel in millimetres',
        example: 400,
    })
    readonly breadth: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({
        description: 'The height of the parcel in millimetres',
        example: 200,
    })
    readonly height: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({
        description: 'The weight of the parcel in kilograms',
        example: 3,
    })
    readonly weight: number;
}

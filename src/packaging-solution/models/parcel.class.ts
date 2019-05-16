import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Parcel {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({ description: 'The length of the parcel in millimetres', example: 300 })
    readonly length: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({ description: 'The breadth of the parcel in millimetres', example: 400 })
    readonly breadth: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({ description: 'The height of the parcel in millimetres', example: 200 })
    readonly height: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiModelProperty({ description: 'The weight of the parcel in kilograms', example: 3 })
    readonly weight: number;

    constructor(length: number, breadth: number, height: number, weight: number) {
        [this.length, this.breadth, this.height, this.weight] = [length, breadth, height, weight];
    }

    /**
     * @description determine whether this parcel can be rotated to fit within another parcel
     * @param anotherParcel the parcel to test whether this parcel can fit inside or not
     */
    public canFitInside(anotherParcel: Parcel): boolean {
        const thisParcelDims = [this.length, this.breadth, this.height].sort();
        const anotherParcelDims = [anotherParcel.length, anotherParcel.breadth, anotherParcel.height].sort();
        return (
            thisParcelDims[0] <= anotherParcelDims[0] &&
            thisParcelDims[1] <= anotherParcelDims[1] &&
            thisParcelDims[2] <= anotherParcelDims[2]
        );
    }
}

import { ParcelDto } from './parcel.dto';

export class Parcel {
    readonly length: number;
    readonly breadth: number;
    readonly height: number;
    readonly weight: number;

    public static fromDto(parcelDto: ParcelDto): Parcel {
        return new Parcel(parcelDto.length, parcelDto.breadth, parcelDto.height, parcelDto.weight);
    }

    constructor(length: number, breadth: number, height: number, weight: number) {
        [this.length, this.breadth, this.height, this.weight] = [length, breadth, height, weight];
    }

    public toDto(): ParcelDto {
        return {
            length: this.length,
            breadth: this.breadth,
            height: this.height,
            weight: this.weight,
        };
    }

    public isTooHeavy(): boolean {
        return this.weight > 25;
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

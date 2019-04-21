import { PackagingSolutionDto } from './models/packaging-solution.dto';
import { plainToClass } from 'class-transformer';

export const MAX_SUPPORTED_PARCEL_WEIGHT: number = 25;

export const packagingSolutions: PackagingSolutionDto[] = [
    {
        name: 'small',
        cost: '5.00',
        parcel: {
            length: 200,
            breadth: 300,
            height: 150,
            weight: 25,
        },
    }, {
        name: 'medium',
        cost: '7.50',
        parcel: {
            length: 300,
            breadth: 400,
            height: 200,
            weight: 25,
        },
    }, {
        name: 'large',
        cost: '8.50',
        parcel: {
            length: 400,
            breadth: 600,
            height: 250,
            weight: 25,
        },
    },
].map(object => plainToClass(PackagingSolutionDto, object));

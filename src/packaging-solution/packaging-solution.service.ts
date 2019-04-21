import { Injectable, Logger } from '@nestjs/common';
import { Parcel } from './models/parcel.class';
import { PackagingSolutionDto } from './models/packaging-solution.dto';

export const MAX_SUPPORTED_PARCEL_WEIGHT: number = 25;

@Injectable()
export class PackagingSolutionService {
    private readonly logger = new Logger(PackagingSolutionService.name);

    private packagingSolutions: Map<string, Parcel> = new Map<string, Parcel>([
        { solutionName: 'small', solutionParcel: new Parcel(200, 300, 150, 25) },
        { solutionName: 'medium', solutionParcel: new Parcel(300, 400, 200, 25) },
        { solutionName: 'large', solutionParcel: new Parcel(400, 600, 250, 25) },
    ].map(i => [i.solutionName, i.solutionParcel]));

    /**
     * Resolves the minimal packaging solution from all known package solutions.
     * @param parcel The parcel to try putting inside all known packaging solutions.
     */
    public getPackagingSolution(parcel: Parcel): PackagingSolutionDto {
        this.logger.log(`Attempting to resolve supported solution for parcel: ${JSON.stringify(parcel)}`);

        if (this.parcelIsTooHeavy(parcel)) {
            this.logger.warn(`Parcel is too heavy (${parcel.weight}kg). Aborting packaging solution resolution`);
            return null;
        }

        for (const [solutionName, solutionParcel] of this.packagingSolutions.entries()) {
            this.logger.log(`Testing parcel ${JSON.stringify(parcel.toDto())} inside ${solutionName} ${JSON.stringify(solutionParcel.toDto())}`);

            if (parcel.canFitInside(solutionParcel)) {
                const packagingSolution: PackagingSolutionDto = { solutionName, solutionParcel: solutionParcel.toDto() };
                this.logger.log(`Found a minimal packaging solution: ${JSON.stringify(packagingSolution)}`);
                return packagingSolution;
            }
        }
        this.logger.warn(`Failed to resolve a packaging solution. Package exceeds supported dimensions.`);
        return null;
    }

    private parcelIsTooHeavy(parcel: Parcel): boolean {
        return parcel.weight > MAX_SUPPORTED_PARCEL_WEIGHT;
    }
}

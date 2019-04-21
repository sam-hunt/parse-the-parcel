import { Injectable, Logger } from '@nestjs/common';
import { Parcel } from './models/parcel.class';
import { PackagingSolutionDto } from './models/packaging-solution.dto';
import { packagingSolutions, MAX_SUPPORTED_PARCEL_WEIGHT } from './packaging-solutions';

@Injectable()
export class PackagingSolutionService {
    private readonly logger = new Logger(PackagingSolutionService.name);

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

        for (const solution of packagingSolutions) {
            this.logger.log(`Testing parcel ${JSON.stringify(parcel.toDto())} inside ${solution.name} ${JSON.stringify(solution.parcel)}`);

            if (parcel.canFitInside(Parcel.fromDto(solution.parcel))) {
                this.logger.log(`Found a minimal packaging solution: ${JSON.stringify(solution)}`);
                return solution;
            }
        }
        this.logger.warn(`Failed to resolve a packaging solution. Package exceeds supported dimensions.`);
        return null;
    }

    private parcelIsTooHeavy(parcel: Parcel): boolean {
        return parcel.weight > MAX_SUPPORTED_PARCEL_WEIGHT;
    }
}

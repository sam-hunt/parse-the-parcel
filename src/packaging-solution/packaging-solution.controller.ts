import { Controller, Post, Body, Res, Logger, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiOkResponse, ApiPayloadTooLargeResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ParcelDto } from './models/parcel.dto';
import { PackagingSolutionDto } from './models/packaging-solution.dto';
import { PackagingSolutionService } from './packaging-solution.service';
import { Parcel } from './models/parcel.class';

@Controller('v1/packaging-solution')
export class PackagingSolutionController {
    private readonly logger = new Logger(PackagingSolutionController.name);

    constructor(
        private readonly packagingSolutionService: PackagingSolutionService,
    ) {}

    @Post('')
    @ApiUseTags('packaging-solution')
    @ApiOperation({
        title: 'Resolve a supported packaging solution from a parsed-in parcel',
    })
    @ApiOkResponse({
        description: 'OK',
        type: PackagingSolutionDto,
    })
    @ApiPayloadTooLargeResponse({
        description: 'Parcel dimensions or weight exceed all supported packaging solutions',
    })
    public getPackagingSolution(@Body() parcelDto: ParcelDto, @Res() response: Response) {
        this.logger.log(`Received the following parcel for parsing: ${JSON.stringify(parcelDto)}`);
        const parcel: Parcel = Parcel.fromDto(parcelDto);
        if (!parcel || !parcel.isValidParcel()) {
            const message = `Parcel must have positive numeric dimensions`;
            this.logger.warn(`Recieved an invalid parcel. Returning 400 - ${message}`);
            throw new HttpException(message, 400);
        }
        const packagingSolution: PackagingSolutionDto = this.packagingSolutionService.getPackagingSolution(parcel);

        if (!packagingSolution) {
            const message = `Parcel dimensions or weight exceed all supported packaging solutions`;
            this.logger.warn(`Failed to resolve a packaging solution. Returning 413 - ${message}`);
            throw new HttpException(message, 413);
        }
        return response.send(packagingSolution);
    }
}

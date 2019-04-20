import { ApiModelProperty } from '@nestjs/swagger';
import { ParcelDto } from './parcel.dto';

export class PackagingSolutionDto {
    @ApiModelProperty({
        description: 'The name of the packaging solution',
        example: 'medium',
    })
    readonly solutionName: string;

    @ApiModelProperty()
    readonly solutionParcel: ParcelDto;
}

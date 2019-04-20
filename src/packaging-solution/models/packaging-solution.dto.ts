import { ApiModelProperty } from '@nestjs/swagger';
import { ParcelDto } from './parcel.dto';

export class PackagingSolutionDto {
    @ApiModelProperty()
    readonly solutionName: string;

    @ApiModelProperty()
    readonly solutionParcel: ParcelDto;
}

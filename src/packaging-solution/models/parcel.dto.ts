import { ApiModelProperty } from '@nestjs/swagger';

export class ParcelDto {
    @ApiModelProperty()
    readonly length: number;

    @ApiModelProperty()
    readonly breadth: number;

    @ApiModelProperty()
    readonly height: number;

    @ApiModelProperty()
    readonly weight: number;
}

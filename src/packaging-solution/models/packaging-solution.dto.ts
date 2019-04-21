import { ApiModelProperty } from '@nestjs/swagger';
import { ParcelDto } from './parcel.dto';

export class PackagingSolutionDto {
    @ApiModelProperty({
        description: 'The name of the packaging solution',
        example: 'medium',
    })
    readonly name: string;

    @ApiModelProperty({
        description: 'The cost to the user of the solution in dollars',
        example: '7.50',
    })
    readonly cost: string;

    @ApiModelProperty()
    readonly parcel: ParcelDto;
}

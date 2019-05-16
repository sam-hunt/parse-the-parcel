import { Module } from '@nestjs/common';
import { PackagingSolutionService } from './packaging-solution.service';
import { PackagingSolutionController } from './packaging-solution.controller';

@Module({
    providers: [PackagingSolutionService],
    controllers: [PackagingSolutionController],
})
export class PackagingSolutionModule {}

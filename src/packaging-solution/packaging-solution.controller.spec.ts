import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionController } from './packaging-solution.controller';

describe('PackagingSolutionController', () => {
    let controller: PackagingSolutionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PackagingSolutionController],
        }).compile();

        controller = module.get<PackagingSolutionController>(PackagingSolutionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

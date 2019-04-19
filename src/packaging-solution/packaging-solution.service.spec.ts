import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionService } from './packaging-solution.service';

describe('PackagingSolutionService', () => {
    let service: PackagingSolutionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PackagingSolutionService],
        }).compile();

        service = module.get<PackagingSolutionService>(PackagingSolutionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

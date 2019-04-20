import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionService } from './packaging-solution.service';
import { Parcel } from './models/parcel.class';

describe('PackagingSolutionService', () => {
    let service: PackagingSolutionService;

    const aVeryHeavyParcel = Parcel.fromDto({ length: 100, breadth: 100, height: 100, weight: Infinity });
    const aVeryLargeParcel = Parcel.fromDto({ length: Infinity, breadth: Infinity, height: Infinity, weight: 1 });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PackagingSolutionService],
        }).compile();

        service = module.get<PackagingSolutionService>(PackagingSolutionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`should define a method 'getPackagingSolution'`, () => {
        expect(service.getPackagingSolution).toBeDefined();
    });

    describe('Supported packaging solution scenarios', () => {
        it('should return a small packaging solution for small parcels', () => {
            expect(service.getPackagingSolution(new Parcel(1, 1, 1, 2)).solutionName).toBe('small');
            expect(service.getPackagingSolution(new Parcel(200, 300, 150, 2)).solutionName).toBe('small');
        });

        it('should return a medium packaging solution for medium parcels', () => {
            expect(service.getPackagingSolution(new Parcel(201, 301, 151, 3)).solutionName).toBe('medium');
            expect(service.getPackagingSolution(new Parcel(300, 400, 200, 3)).solutionName).toBe('medium');
        });

        it('should return a large packaging solution for large parcels', () => {
            expect(service.getPackagingSolution(new Parcel(301, 401, 201, 5)).solutionName).toBe('large');
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, 5)).solutionName).toBe('large');
        });
    });

    describe('Unsupported packaging solution scenarios', () => {
        it('should fail to resolve a packaging solution for parcels which are too heavy', () => {
            expect(service.getPackagingSolution(aVeryHeavyParcel)).toBeNull();
        });

        it('should fail to resolve a packaging solution for parcels which are too large', () => {
            expect(service.getPackagingSolution(aVeryLargeParcel)).toBeNull();
        });

        it('should not throw an exception on failing to resolve packaging solutions', () => {
            expect(() => service.getPackagingSolution(aVeryHeavyParcel)).not.toThrow(Error);
            expect(() => service.getPackagingSolution(aVeryLargeParcel)).not.toThrow(Error);
        });
    });
});

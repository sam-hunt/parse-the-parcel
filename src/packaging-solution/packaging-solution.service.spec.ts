import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionService } from './packaging-solution.service';
import { Parcel } from './models/parcel.class';

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

    it(`should define a method 'getPackagingSolution'`, () => {
        expect(service.getPackagingSolution).toBeDefined();
    });

    describe('Supported packaging solution scenarios', () => {
        it('should return a small packaging solution for parcels up to 200x300x150 and less than or exactly 25kg', () => {
            expect(service.getPackagingSolution(new Parcel(1, 1, 1, 2)).solutionName).toBe('small');
            expect(service.getPackagingSolution(new Parcel(200, 300, 150, 2)).solutionName).toBe('small');
            expect(service.getPackagingSolution(new Parcel(200, 300, 150, 25)).solutionName).toBe('small');
        });

        it('should return a medium packaging solution for parcels larger than 200x300x150 up to 300x400x200 and less than or exactly 25kg', () => {
            expect(service.getPackagingSolution(new Parcel(201, 301, 151, 3)).solutionName).toBe('medium');
            expect(service.getPackagingSolution(new Parcel(300, 400, 200, 3)).solutionName).toBe('medium');
            expect(service.getPackagingSolution(new Parcel(300, 400, 200, 25)).solutionName).toBe('medium');
        });

        it('should return a large packaging solution for parcels larger than 300x400x200 up to 400x600x250 and less than or exactly 25kg', () => {
            expect(service.getPackagingSolution(new Parcel(301, 401, 201, 5)).solutionName).toBe('large');
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, 5)).solutionName).toBe('large');
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, 25)).solutionName).toBe('large');
        });
    });

    describe('Unsupported packaging solution scenarios', () => {
        it('should fail to resolve a packaging solution for parcels which are over 25kg', () => {
            expect(service.getPackagingSolution(new Parcel(200, 300, 150, 25.1))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(300, 400, 200, 25.1))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, 25.1))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, Infinity))).toBeNull();
        });

        it('should fail to resolve a packaging solution for parcels which are large than 400x600x250', () => {
            expect(service.getPackagingSolution(new Parcel(400, 600, 250, 5)).solutionName).toBe('large');
            expect(service.getPackagingSolution(new Parcel(401, 600, 250, 5))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(400, 601, 250, 5))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(400, 600, 251, 5))).toBeNull();
            expect(service.getPackagingSolution(new Parcel(Infinity, Infinity, Infinity, 5))).toBeNull();
        });

        it('should not throw an exception on failing to resolve packaging solutions', () => {
            expect(() => service.getPackagingSolution(new Parcel(400, 600, 250, Infinity))).not.toThrow(Error);
            expect(() => service.getPackagingSolution(new Parcel(Infinity, Infinity, Infinity, 5))).not.toThrow(Error);
        });
    });
});

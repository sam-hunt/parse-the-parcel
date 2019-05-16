import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionController } from './packaging-solution.controller';
import { PackagingSolutionService } from './packaging-solution.service';
import { HttpException } from '@nestjs/common';
import { PackagingSolution } from './models/packaging-solution.class';
import { plainToClass } from 'class-transformer';
import { Parcel } from './models/parcel.class';

describe('PackagingSolutionController', () => {
    let controller: PackagingSolutionController;
    let service: PackagingSolutionService;

    const mockValidParcel: Parcel = plainToClass(Parcel, { length: 100, breadth: 100, height: 100, weight: 1 });
    const mockValidPackagingSolution: PackagingSolution = plainToClass(PackagingSolution, {
        name: 'mockSolution',
        cost: '100.00',
        parcel: mockValidParcel,
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PackagingSolutionController],
            providers: [PackagingSolutionService],
        }).compile();

        controller = module.get<PackagingSolutionController>(PackagingSolutionController);
        service = module.get<PackagingSolutionService>(PackagingSolutionService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('Packaging Solution Resolver', () => {
        it(`should define a method 'getPackagingSolution'`, () => {
            expect(controller.getPackagingSolution).toBeDefined();
        });

        it(`should call 'getPackagingSolution' on the PackagingSolutionService when the parcel input is valid`, () => {
            const mockSentResponse = 'mockSentResponse';
            const mockResponse = { send: () => mockSentResponse };
            jest.spyOn(service, 'getPackagingSolution').mockImplementation(() => mockValidPackagingSolution);
            expect(controller.getPackagingSolution(mockValidParcel, mockResponse as any)).toBe(mockSentResponse);
            expect(service.getPackagingSolution).toHaveBeenCalled();
        });

        it(`should throw an HttpException when a packaging solution can not be resolved for a valid parcel input`, () => {
            jest.spyOn(service, 'getPackagingSolution').mockImplementation(() => null);
            expect(() => controller.getPackagingSolution(mockValidParcel, null)).toThrow(HttpException);
        });
    });
});

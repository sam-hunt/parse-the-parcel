import { Test, TestingModule } from '@nestjs/testing';
import { PackagingSolutionController } from './packaging-solution.controller';
import { PackagingSolutionService } from './packaging-solution.service';
import { Parcel } from './models/parcel.class';
import { ParcelDto } from './models/parcel.dto';
import { HttpException } from '@nestjs/common';
import { PackagingSolutionDto } from './models/packaging-solution.dto';

describe('PackagingSolutionController', () => {
    let controller: PackagingSolutionController;
    let service: PackagingSolutionService;

    const mockValidParcelDto: ParcelDto = { length: 100, breadth: 100, height: 100, weight: 1 };
    const mockValidPackagingSolution: PackagingSolutionDto = {
        solutionName: 'mockSolution',
        solutionParcel: mockValidParcelDto,
    };

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

        it(`should throw an HttpException on parcel input missing properties`, () => {
            expect(() => controller.getPackagingSolution({} as ParcelDto, null)).toThrow(HttpException);
        });

        it(`should throw an HttpException on parcel input having invalid property values`, () => {
            expect(() => controller.getPackagingSolution({
                length: -1,
                breadth: 'hello',
                height: Infinity,
                weight: 0,
            } as unknown as ParcelDto, null)).toThrow(HttpException);
        });

        it(`should call 'getPackagingSolution' on the PackagingSolutionService when the parcel input is valid`, () => {
            const mockSentResponse = 'mockSentResponse';
            const mockResponse = { send: () => mockSentResponse };
            jest.spyOn(service, 'getPackagingSolution').mockImplementation(() => mockValidPackagingSolution);
            expect(controller.getPackagingSolution(mockValidParcelDto, mockResponse as any)).toBe(mockSentResponse);
            expect(service.getPackagingSolution).toHaveBeenCalled();
        });

        it(`should throw an HttpException when a packaging solution can not be resolved for a valid parcel input`, () => {
            jest.spyOn(service, 'getPackagingSolution').mockImplementation(() => null);
            expect(() => controller.getPackagingSolution(mockValidParcelDto, null)).toThrow(HttpException);
        });
    });
});

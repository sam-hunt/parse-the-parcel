import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = testingModule.get<AppController>(AppController);
        appService = testingModule.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(appController).toBeDefined();
    });

    describe('root endpoint', () => {
        it(`should define a method 'getAppInfo'`, () => {
            expect(appController.getAppInfo).toBeDefined();
        });

        it(`should call 'getAppInfo' on the appService`, async () => {
            const mockResult = 'mock app info';
            jest.spyOn(appService, 'getAppInfo').mockImplementation(() => mockResult);
            expect(appController.getAppInfo()).toBe(mockResult);
            expect(appService.getAppInfo).toHaveBeenCalled();
        });
    });
});

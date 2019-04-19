import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('PosNameService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAppInfo', () => {
        it(`should define a method called 'getAppInfo`, () => {
            expect(service.getAppInfo).toBeDefined();
        });

        it(`should return a message string from 'getAppInfo'`, () => {
            const result = service.getAppInfo();
            expect(typeof result).toBe('string');
        });

        it(`should return a message from 'getAppInfo' including a welcome html h1 element`, () => {
            const result = service.getAppInfo();
            expect(result).toMatch('<h1>Welcome to Parse-the-Parcel</h1>');
        });

        it(`should return a message from 'getAppInfo' including an html anchor link to the swagger documentation`, () => {
            const result = service.getAppInfo();
            expect(result).toMatch('<a href="/docs">');
        });
    });
});

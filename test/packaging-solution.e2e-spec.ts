import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PackageSolutionController (e2e)', () => {
    let app;

    const packagingSolutionEndpoint = '/v1/packaging-solution';

    const aSmallParcel = { length: 200, breadth: 300, height: 150, weight: 2 };
    const aMediumParcel = { length: 300, breadth: 400, height: 200, weight: 5 };
    const aLargeParcel = { length: 400, breadth: 600, height: 250, weight: 10 };
    const aLargeMaxWeightParcel = { length: 400, breadth: 600, height: 250, weight: 25 };
    const anOversizeParcel = { length: 1000, breadth: 1000, height: 1000, weight: 20 };
    const anOverWeightParcel = { length: 400, breadth: 600, height: 250, weight: 26 };
    const aParcelNotJsonEncoded = 'length: 200, breadth: 300, height: 150, weight: 2';
    const aParcelMissingProperties = {};
    const aNegativeSpaceParcel = { length: -200, breadth: -300, height: -150, weight: 5 };
    const anAntiMatterParcel = { length: 300, breadth: 400, height: 200, weight: -10 };
    const aFloatingParcel = { length: 300, breadth: 400, height: 200, weight: 0 };
    const anInvalidParcel = { length: 'not', breadth: 'a', height: 'real', weight: 'parcel' };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe(packagingSolutionEndpoint, () => {
        it(`POST should return 200 a small solution for parcels 200x300x150`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aSmallParcel)
                .expect(200)
                .then(response => {
                    expect(response.body.solutionName).toBe('small');
                });
        });

        it(`POST should return 200 medium solution for parcels 300x400x200`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aMediumParcel)
                .expect(200)
                .then(response => {
                    expect(response.body.solutionName).toBe('medium');
                });
        });

        it(`POST should return 200 large solution for parcels 400x600x250`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aLargeParcel)
                .expect(200)
                .then(response => {
                    expect(response.body.solutionName).toBe('large');
                });
        });

        it(`POST should return 200 for large parcels which are exactly 25kg`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aLargeMaxWeightParcel)
                .expect(200)
                .then(response => {
                    expect(response.body.solutionName).toBe('large');
                });
        });

        it(`POST should return 413 payload too large for parcels over 400x600x250`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(anOversizeParcel)
                .expect(413)
                .then(response => {
                    expect(response.body.solutionName).toBeUndefined();
                });
        });

        it(`POST should return 413 payload too large for parcels over 25kg`, () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(anOverWeightParcel)
                .expect(413)
                .then(response => {
                    expect(response.body.solutionName).toBeUndefined();
                });
        });

        it('POST should return 400 bad request when missing a request body', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .expect(400);
        });

        it('POST should return 400 bad request when request body is not JSON encoded', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aParcelNotJsonEncoded)
                .expect(400);
        });

        it('POST should return 400 bad request when missing properties', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aParcelMissingProperties)
                .expect(400);
        });

        it('POST should return 400 bad request when a parcel occupies negative space', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aNegativeSpaceParcel)
                .expect(400);
        });

        it('POST should return 400 bad request when a parcel is made of antimatter having negative mass', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(anAntiMatterParcel)
                .expect(400);
        });

        it('POST should return 400 bad request when a parcel is being stored in Zero-Gravity', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(aFloatingParcel)
                .expect(400);
        });

        it('POST should return 400 bad request when a parcel is not really a parcel', () => {
            return request(app.getHttpServer())
                .post(packagingSolutionEndpoint)
                .send(anInvalidParcel)
                .expect(400);
        });
    });

});

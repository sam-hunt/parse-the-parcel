import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/ (root endpoint)', () => {
        it('/ (GET) should succeed with 200 success code', () => {
            return request(app.getHttpServer())
                .get('/')
                .expect(200);
        });

        it('/ (GET) should return a welcome message', () => {
            return request(app.getHttpServer())
                .get('/')
                .then(response => {
                    expect(response.text).toMatch('Welcome to Parse-the-Parcel');
                });
        });

        it('/ (GET) should contain a link to the documentation', () => {
            return request(app.getHttpServer())
                .get('/')
                .then(response => {
                    expect(response.text).toMatch('<a href="/docs">');
                });
        });
    });

});

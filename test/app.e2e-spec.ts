import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app;

    const rootEndpoint = '/';

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/ (root endpoint)', () => {
        it('GET should return 200 with a text/html content response', () => {
            return request(app.getHttpServer())
                .get(rootEndpoint)
                .expect(200)
                .then(response => {
                    expect(response.type).toBe('text/html');
                });
        });

        it('GET should return 200 and contain welcome message', () => {
            return request(app.getHttpServer())
                .get(rootEndpoint)
                .then(response => {
                    expect(response.text).toMatch('Welcome to Parse-the-Parcel');
                });
        });

        it('GET should return 200 and contain a link to the documentation', () => {
            return request(app.getHttpServer())
                .get(rootEndpoint)
                .then(response => {
                    expect(response.text).toMatch('<a href="/docs">');
                });
        });
    });

});

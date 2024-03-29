// Import reflect-metadata here, as unlike controller and service tests, this does not initialise an app instance (which imports it in app.module).
import 'reflect-metadata';
import { Parcel } from './parcel.class';

describe('Parcel', () => {

    it('should be defined', () => {
        expect(Parcel).toBeDefined();
    });

    describe('Type transformations', () => {
        it('should populate each property when created via constructor', () => {
            const result: Parcel = new Parcel(100, 200, 300, 1);
            expect(result.length).toBe(100);
            expect(result.breadth).toBe(200);
            expect(result.height).toBe(300);
            expect(result.weight).toBe(1);
        });
    });

    describe('Checking whether the parcel can fit inside another parcel', () => {
        it('should pass when all dimensions are less than the other parcel', () => {
            expect(new Parcel(100, 200, 300, 1).canFitInside(new Parcel(200, 300, 400, 1))).toBe(true);
        });

        it('should pass when the parcel could be rotated to fit inside the other parcel', () => {
            expect(new Parcel(100, 200, 300, 1).canFitInside(new Parcel(100, 300, 200, 1))).toBe(true);
        });

        it('should fail when all dimensions are greater than the other parcel', () => {
            expect(new Parcel(200, 300, 400, 1).canFitInside(new Parcel(100, 200, 300, 1))).toBe(false);
        });
    });
});

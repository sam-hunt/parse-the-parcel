import { Parcel } from './parcel.class';
import { ParcelDto } from './parcel.dto';

describe('Parcel', () => {

    const mockValidParcelDto: ParcelDto = { length: 100, breadth: 100, height: 100, weight: 1 };

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

        it('should statically create a Parcel class instance from a ParcelDto object', () => {
            expect(Parcel.fromDto(mockValidParcelDto).constructor.name).toBe('Parcel');
        });

        it('should create a ParcelDto object instance from a Parcel instance', () => {
            const result = new Parcel(100, 200, 300, 1).toDto();
            expect(result.constructor.name).toBe('Object');
            ['length', 'breadth', 'height', 'weight'].forEach(property => {
                expect(result[property]).toBeDefined();
                expect(result[property]).toBeTruthy();
            });
        });
    });

    describe('Checking whether the parcel is too heavy', () => {
        it('should not be too heavy if the weight is under 25kg', () => {
            expect(new Parcel(100, 200, 300, 1).isTooHeavy()).toBe(false);
            expect(new Parcel(100, 200, 300, 24.9).isTooHeavy()).toBe(false);
            expect(new Parcel(100, 200, 300, -Infinity).isTooHeavy()).toBe(false);
        });

        it('should not be too heavy if the weight is exactly 25kg', () => {
            expect(new Parcel(100, 200, 300, 25).isTooHeavy()).toBe(false);
        });

        it('should be too heavy if the weight is over 25kg', () => {
            expect(new Parcel(100, 200, 300, 25.1).isTooHeavy()).toBe(true);
            expect(new Parcel(100, 200, 300, Infinity).isTooHeavy()).toBe(true);
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

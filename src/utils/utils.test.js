import "@testing-library/jest-dom";

import { calculateStartDate } from "./utils";


describe("Utils", () => {


    test(`[Calendar days]. When current date is Feb 20201, the start day should be Jan 31, 2021`, () => {

        const currentDate = new Date(2021, 1, 21);
        const expectedDate = new Date(2021, 0, 31);
        const result = calculateStartDate({currentDate, maxColumns: 42});
        
        
        expect(result.monthStartDate).toStrictEqual(expectedDate);
    });
});
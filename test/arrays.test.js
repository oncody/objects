import {Arrays} from "../src/arrays.js";

test('test array max', () => {
    expect(Arrays.max([1,5,3])).toBe(5);
});
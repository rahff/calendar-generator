import { add } from '../src/index';

describe('test', ()=>{
    it('should works', ()=>{
        const result = add(4, 8);
        expect(result).toEqual(12);
    })
})
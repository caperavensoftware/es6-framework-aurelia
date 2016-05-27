import chai from 'chai';
import {Welcome} from './../../../src/welcome/welcome.js';

const expect = chai.expect;

describe('Welcome Tests', function() {
    it('Construction', function() {
       let welcome = new Welcome();
       expect(welcome).to.not.be.null; 
    });
});
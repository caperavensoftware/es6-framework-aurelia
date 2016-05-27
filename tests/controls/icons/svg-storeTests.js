
import chai from 'chai';
import {SvgStore} from './../../../src/controls/icons/svg-store.js';

let icons = require('./icons.json');

const expect = chai.expect;

describe('svg store tests', function() {
    it ('do something', function() {
        const store = new SvgStore(icons);            
        const icon = store.findItemByName('add');
        
        expect(icon).to.not.be.null;
    })    
})
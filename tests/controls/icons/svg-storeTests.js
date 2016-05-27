
import chai from 'chai';
import {SvgStore} from './../../../src/controls/icons/svg-store.js';
import * as icons from './icons.json';
//let icons = require('./icons.json');

const expect = chai.expect;

describe('svg store tests', function() {
    it('do something', function() {
        const store = new SvgStore(icons);            
        const icon = store.findItemByName('add');
        
        expect(icon).to.not.be.null;
        expect(icon.name, 'add');
        expect(icon.data, '<path d=\"M96 60H68V32h-8v28H32v8h28v28h8V68h28z\"/>');
    });    
});
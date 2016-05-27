import chai from 'chai';
import sinon from 'sinon';
import {configure} from './../../src/main.js';

const expect = chai.expect;

class AureliaMock {
    constructor() {
        this.use = {
            standardConfiguration() {
                return this;
            },
            
            developmentLogging() {
                return this;
            }            
        };
    }    
        
    start() {
        return new Promise((resolve) => {
           resolve(); 
        });
    }
    
    setRoot() {
        return this;
    }
}

describe('Main Tests', function() {
    it ('configure', function() {
        let aureliaMock = new AureliaMock();
        
        sinon.spy(aureliaMock.use, 'standardConfiguration');
        sinon.spy(aureliaMock.use, 'developmentLogging');
        sinon.spy(aureliaMock, 'start');
        sinon.spy(aureliaMock, 'setRoot');
        
        configure(aureliaMock).then(() => {
            expect(aureliaMock.use).to.be.not.null;
            expect(aureliaMock.use.standardConfiguration.calledOnce).to.be.true;
            expect(aureliaMock.use.developmentLogging.calledOnce).to.be.true;
            expect(aureliaMock.start.calledOnce).to.be.true;
            expect(aureliaMock.setRoot.calledOnce).to.be.true;            
        });        
    });
});
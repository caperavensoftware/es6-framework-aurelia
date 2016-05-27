import chai from 'chai';
import {App} from './../../src/app.js';

const expect = chai.expect;

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('App Tests', function() {
   let app = null;
   let mockRouter = null;
   
   before(function() {
        app = new App();            
        mockRouter = new RouterStub();
        app.configureRouter(mockRouter, mockRouter);
   });
   
   it ('Check title', function() {
       expect('ES6 Framework Aurelia', app.title);
   });
   
   it ('router defined', function() {
      expect(app.router).to.not.be.null; 
   });
   
   it ('welcome route defined', function() {
      expect(app.router.routes).to.contain({route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome/welcome', nav: true, title: 'Welcome'});
   });
});
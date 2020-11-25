assert = require('assert'),
    chai = require('chai'),
    should = require('should');
request = require('supertest');
const { expect } = require('chai');
const { findServer, findServer_copy } = require("../controlers/serverAvailability");
const serverList = require('./mockData.json');

describe('findServer() method', function () {
    it('check if server is working', async () => {
        const serverResponse = await findServer(serverList)
        
        expect(serverResponse).to.be.an.instanceOf(Object)
        expect(serverResponse.server).to.be.an.instanceOf(Object);
        expect(serverResponse.success).to.be.a('boolean');
        expect(serverResponse.success).to.equal(true);
        expect(serverResponse.server.url).to.be.a('string');
        expect(serverResponse.server.url).to.equal("http://localhost:5000/test/workingsame");

    });
});


describe('findServer_copy() method', function () {
    it('check if server is working', async () => {
        const serverResponse = await findServer_copy(serverList);
        
        expect(serverResponse).to.be.an.instanceOf(Object)
        expect(serverResponse.server).to.be.an.instanceOf(Object);
        expect(serverResponse.success).to.be.a('boolean');
        expect(serverResponse.success).to.equal(true);
        expect(serverResponse.server.url).to.be.a('string');
        expect(serverResponse.server.url).to.equal("http://localhost:5000/test/workingsame");

    });
});

import http from '../../src/lib/http';

import mockupData from '../../src/components/accordion/mockup-data';

const chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('HTTP Service', () => {

    it('Datos recibidos correctamente', function (done) {

        this.timeout(5000);

        let ifError = () => {
            throw Error();
        };

        chai.request('https://gist.githubusercontent.com')
            .get('/gabriel-lopez-lopez/bc87e54680242b68d0f96c8c419bcf2a/raw/26b68eda52d60e4db18f506a980d430990796751/accordion-list-items.json')
            .then(function (res) {
                ifError = () => {};
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
                throw err;
                done();
            });

        setTimeout(() => {
            ifError();
            done();
        }, 4900);

    });

});
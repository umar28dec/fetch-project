const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const app = require('../index');
chai.use(chaiHttp);

describe('GET /todos', () => {
    it('should return a list of todos', (done) => {
        chai.request(app)
            .get('/todos')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Todo fetched');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('should handle errors and return 500 status', (done) => {
        chai.request(app)
            .get('/todos')
            .query({ forceError: true })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Internal Server Error');
                done();
            });
    });
});

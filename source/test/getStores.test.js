let chaiHttp = require('chai-http');
let chai = require('chai')
chai.use(chaiHttp);
describe ('GET store', () => {
    it ('it should GET all the stores', (done) => {
        chai.request('http://localhost:6666')
        .get('/stores')

        .then (function(res) {
            expect(res).to.have.status(200)
        })
        .catch(function(err) {
            throw err
        })
        done()
        })
 })
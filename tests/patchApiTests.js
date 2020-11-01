import 'dotenv/config';
import chai from 'chai';
import app from '../src/index';
import chaiHttp from 'chai-http';

//CHOOSE CHAI ASSERTION STYLE
const { expect } = chai;

chai.use(chaiHttp);

//JWT access token
let jwt;

describe("/patch", () => {
    it("should return a patched object", async function() {
        jwt = await get_jwt();
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({ 
            "unPatched": {
                "Company": "HackerBay",
                "Candidate": "Atiq Gauri",
                "Interview": "Ongoing"
            }, 
            "patch": {
                "op": "replace",
                "path": "/Interview",
                "value": "Accepted"
            }
        });
        
        expect(res.body.Interview).to.equal('Accepted');
        expect(res).to.have.status(200);
    });


    it("should return a error object when input is not provided", async function() {
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({ 
            "unPatched": {
                "Company": "HackerBay",
                "Candidate": "Atiq Gauri",
                "Interview": "Ongoing"
            }
        });
        
        expect(res).to.have.any.key('error');
        expect(res).to.have.status(200);
    });

    it("should return a patched object containing integer", async function() {
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({ 
            "unPatched": {
                "Company": "HackerBay",
                "Candidate": "Atiq Gauri",
                1: 0
            },
            "patch": {
                "op": "replace",
                "path": '/'+1,
                "value": 0
            }
        });
        
        expect(res.body).to.have.any.key(1);
        expect(res).to.have.status(200);
    });


    it("should return a error object when invalid path is provided", async function() {
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({ 
            "unPatched": {
                "Company": "HackerBay",
                "Candidate": "Atiq Gauri",
                "Interview": "Ongoing"
            },
            "patch": {
                "op": "replace",
                "path": "/invalid",
                "value": "Accepted"
            }
        });
        
        expect(res).to.have.any.key('error');
        expect(res).to.have.status(200);
    });
});

function get_jwt(){
    return chai
    .request("http://localhost:"+process.env.PORT)
    .post("/login")
    .set('content-type', 'application/json')
    .send({
      "username": "atiqgauri",
      "password": "hackerbay"
    });
}
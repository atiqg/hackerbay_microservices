import 'dotenv/config';
import chai from 'chai';
import app from '../src/index';
import chaiHttp from 'chai-http';

//CHOOSE CHAI ASSERTION STYLE
const { expect } = chai;

chai.use(chaiHttp);

//JWT access token
let jwt;


describe("jwt authorization", () => {
    it("/Patch api should return a error object for an empty jwt", async function() {
        jwt = await get_jwt();
            
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', '')
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
        
        expect(res.body).to.have.any.key('error');
        expect(res).to.have.status(200);
    });


    it("/Patch api should return a error object for an invalid jwt", async function() {
            
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .patch("/patch")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken+'invalid')
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
        
        expect(res.body).to.have.any.key('error');
        expect(res).to.have.status(200);
    });


    it("/thumbnail api should return a error object for an empty jwt", async function() {

        this.timeout(15000);
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .get("/thumbnail")
        .set('content-type', 'application/json')
        .set('Authorization', '')
        .send({
            "imageUrl": "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
        });
        
        expect(res.body).to.have.any.key('error');
        expect(res).to.have.status(200);
    });

    it("/thumbnail api should return a error object for an invalid jwt", async function() {

        this.timeout(15000);
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .get("/thumbnail")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken+'invalid')
        .send({
            "imageUrl": "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
        });
        
        expect(res.body).to.have.any.key('error');
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
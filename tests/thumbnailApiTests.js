import 'dotenv/config';
import chai from 'chai';
import app from '../src/index';
import chaiHttp from 'chai-http';

//CHOOSE CHAI ASSERTION STYLE
const { expect } = chai;

chai.use(chaiHttp);

//JWT access token
let jwt;

describe("/thumbnail", () => {
    it("should return a success object with thumbnail address", async function() {
        jwt = await get_jwt();

        this.timeout(15000);
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .get("/thumbnail")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({
            "imageUrl": "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
        });
        
        expect(res.body).to.have.key('success');
        expect(res).to.have.status(200);
    });

    it("should return a error object when url not provided", async function() {

        this.timeout(15000);
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .get("/thumbnail")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({
            "imageUrl": ""
        });
        
        expect(res.body).to.have.key('error');
        expect(res).to.have.status(200);
    });


    it("should return a error object when invalid url provided", async function() {

        this.timeout(15000);
        
        const res = await chai
        .request("http://localhost:"+process.env.PORT)
        .get("/thumbnail")
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+jwt.body.accessToken)
        .send({
            "imageUrl": "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile"
        });
        
        expect(res.body).to.have.key('error');
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
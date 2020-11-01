import jwt from 'jsonwebtoken';
import 'dotenv/config';
import chai from 'chai';
import app from '../src/index';
import chaiHttp from 'chai-http';

//CHOOSE CHAI ASSERTION STYLE
const { expect } = chai;

chai.use(chaiHttp);


describe("/login", () => {
  it("should return jwt with any arbitrary credentials", async function() {
    const res = await chai
    .request("http://localhost:"+process.env.PORT)
    .post("/login")
    .set('content-type', 'application/json')
    .send({
      "username": "atiqgauri",
      "password": "hackerbay"
    });
    
    let decodedToken = null, isValid=true;

    try {
      decodedToken = jwt.verify(res.body.accessToken, process.env.MY_SECRET);
    } catch(e) {
        isValid = false;
    }

    if (decodedToken == null){
      isValid = false;
    }else if(! decodedToken.username || ! decodedToken.password){
      isValid = false;
    }
    
    expect(isValid).to.be.true;
    expect(res).to.have.status(200);
  });

  it("should return error object when input is half provided", async function() {
    const res = await chai
    .request("http://localhost:"+process.env.PORT)
    .post("/login")
    .set('content-type', 'application/json')
    .send({
      "username": "atiqgauri"
    });

    expect(res).to.have.any.key('error');
    expect(res).to.have.status(200);
  });

  it("should return error object when input is not provided", async function() {
    const res = await chai
    .request("http://localhost:"+process.env.PORT)
    .post("/login")
    .set('content-type', 'application/json')
    .send({
      "username": "",
      "password": ""
    });
    
    expect(res).to.have.any.key('error');
    expect(res).to.have.status(200);
  });

  it("should return error object when password is too small", async function() {
    const res = await chai
    .request("http://localhost:"+process.env.PORT)
    .post("/login")
    .set('content-type', 'application/json')
    .send({
      "username": "atiqgauri",
      "password": "a"
    });
    
    expect(res).to.have.any.key('error');
    expect(res).to.have.status(200);
  });
});
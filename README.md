# microservices_api
Backend microservices to support and simplify applications. Simple stateless microservices in Nodejs, with three major functionalities: Authentication with Json web token, JSON Patching and Image Thumbnail Generation.      
Project Include Dockerizing app, API tests, Code coverage report, JSdoc, Central Logging system and javascript linting.
</br>

<!-- TABLE OF CONTENTS -->
### Table of Contents
* [Assignment](#assignments)
  * [Bonus](#bonus)
* [Installation](#installation)
* [Usage](#usage)
* [Test](#test)
* [Code Coverage Report](#coverage)
* [JSdoc](#jsdoc)
* [JS linter](#lint)
* [Dockerize](#docker)
* [Central Log system](#logs)
* [License](#license)
</br>
</br> 


## Assignments: <i id="assignments"></i>

[✅] Authentication API       
[✅] JSON patching API        
[✅] Image Thumbnail Generation API           
[✅] Authentication request return a signed  [JWT]( https://jwt.io/) which can be used to validate future requests      
[✅] If the JWT is missing or invalid, these endpoints should reject the request.      
[✅] Patch and thumbnail request must be protected with JWT           
[✅] Apply the [json patch](http://jsonpatch.com/) to the json object, and return the resulting json object.     
[✅] Create thumbnail(50x50 pixels) of a public image URL and return the resulting thumbnail       
[✅] Include a test suite for the microservices using [Mocha](https://mochajs.org/).    
[✅] Use modern javascript ES6 syntax.       
[✅] Use Git for version control, and host the project in a Github repository       
[✅] Project should contain documentation with setup and usage instructions.        
[✅] Project should install all dependencies with “npm install”, should start the server with “npm start”, and should run the test suite with “npm test”.             
[✅] Really, please just don’t use “console.log” as the primary debugging/logging tool.      
[✅] Use a javascript linter, along with a linting npm script.       
[✅] Dockerize, include a working Dockerfile with the app directory.        
[✅] Push a docker image to public DockerHub, and share the link     

### Bonus: <i id="bonus"></i>
[✅] 100% code coverage in test suite.       
[✅] We recommend using [Istanbul](https://github.com/gotwarlost/istanbul) to generate code test coverage reports.      
[✅] Include JSdoc comments and/or Swagger specifications to impress us.        
[✅] Integrate a centralized app logging/monitoring system.      

</br>

## Installation: <i id="installation"></i> 
```
git clone https://github.com/atiqg/hackerbay_microservices.git
cd hackerbay_microservices
npm install
```
</br>

## Usage: <i id="usage"></i> 
<b>1. Change MY_SECRET and PORT variable in `.env` file or use given defaults</b>
```
MY_SECRET=atiqgauri
PORT=3000
```

<b>2. Start server with:</b>
```
npm start
```
<b>Now use any rest client, curl or if you are using VS Code then use Rest Client Extension to make any of these request:</br></b>
<i>Second and third request require jwt, get it from first request</i>
```
POST http://localhost:3000/login
content-type: application/json

{
    "username": "atiqgauri",
    "password": "hackerbay"
}

###

PATCH http://localhost:3000/patch
Authorization: Bearer <paste_jwt_from_login_request>
content-type: application/json

{ 
    "unPatched": {
        "Company": "HackerBay",
        "Candidate": "Atiq Gauri",
        "Interview Acceptance": "Ongoing"
    }, 
    "patch": {
        "op": "replace",
        "path": "/Interview Acceptance",
        "value": "Accepted"
    }
}

###

GET http://localhost:3000/thumbnail
content-type: application/json
Authorization: Bearer <paste_jwt_from_login_request>

{
    "imageUrl": "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
}
```

</br>

## Test: <i id="test"></i> 
Test using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)           
<i>If server is already running then close it first, then start tests with: </i>
```
npm test
```

</br>

## Code Coverage Report: <i id="coverage"></i> 
Run this command to generate html coverage report with [Istanbul](https://github.com/gotwarlost/istanbul)        
```
npm run coverage
```
Then we can check coverage report by opening `coverage/index.html` file      

</br>

## JSdoc: <i id="jsdoc"></i> 
Run this command to generate JSdoc (require npm JSDoc package globally installed):
```
npm run docs
```
Then we can check documentation by opening `out/index.html` file        

</br>

## Javascript linter: <i id="lint"></i>
JS linting is done with eslint, run this npm script:
```
npm run lint
```

</br>

## Dockerize: <i id="docker"></i>
Build a docker image using: 
```
docker build -t username/microservices_api:1.0 .
```
Run docker image using:     
```
docker run image_id/tag_name
```

<b>Or you can use my public image at [DockerHub](https://hub.docker.com/repository/docker/atiqgauri/microservices_api)</b>

</br>

## Central Log system: <i id="logs"></i>
This project doesn't use console.log anywhere, instead it uses [winston](https://www.npmjs.com/package/winston) to generate a central log file,       
If you have used the app or tests then log file can be found here:           
`app.log`

</br>

## LICENSE: <i id="license"></i>
[MIT](https://github.com/atiqg/hackerbay_microservices/blob/main/LICENSE)

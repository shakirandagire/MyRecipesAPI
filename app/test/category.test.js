const request = require('supertest');
const { app, db } = require('../../index');
describe('Tests for the test', () => {
    test('It should respond with the test message', (done) => {
        request(app).get('/category/test').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

const loginDetails = {
    email: "shakira@yahoo.com",
    hashedPassword: "shakira123"
}
const signUpDetails = {
    username: "Shakira",
    email: "shakira@yahoo.com",
    hashedPassword: "shakira123"
    }

describe('Tests for the test category endpoints', () => {
    let token = null
    beforeEach((done)=>{
        request(app).post('/user/signup')
        .send(signUpDetails)
        .then((response) => {
            expect(response.statusCode).toBe(201);
            done();
        })  
        request(app).post('/user/login')
        .send(loginDetails)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            token = response.body.token
            done() 
        })  
    });
    afterAll(() => {
        db.collection.remove;
    });

    test('It should create the category successfully', (done) =>{ 
        request(app)
        .post('/category/create')
        .set('Authorization',`Bearer ${token}`)
        .send({ name : "Biryani",
                description : "Indian Rice"
        }).then((response) => {
            expect(response.statusCode).toBe(201);
            done();
        })
    })

    test('It should return all categories', () =>{
        request(app)
        .get('/category/view')
        .set('Authorization',`Bearer ${token}`)
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
    })

    test('It should return a single category', (done) => {
        request(app).get('/category/5c496c58e17382996564359c')
        .set('Authorization',`Bearer ${token}`)
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
    })

    test('It should delete a category', (done) =>{
        request(app).delete('/category/5c496c58e17382996564359c/delete')
        .set('Authorization',`Bearer ${token}`)
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
    })

    test('Its should edit a category', (done) =>{
        request(app).put('/category/5c496c58e17382996564359c/update')
        .set('Authorization',`Bearer ${token}`)
        .send({
            "name": "Shell fish",
            "description": "Shell fish that is found in most waters"
        })
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
    })
 })
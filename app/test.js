const request = require('supertest');
const app = require('./server');
const expect = require('chai').expect;

describe('add /users with admin rights', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"Emuel", email:"emuel@gmail.com", password:"emuel@1234", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDRmN2JhZjE0YTg0NDEzODIwZWMzYmMiLCJpYXQiOjE2ODI5MzY0NjQsImV4cCI6MTY4MzAyMjg2NH0.csLwAtSfkY02qwZht5WYJulERQrfsGolYKGer_9i_qc")
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).to.be.a('string');
        expect(res.status).to.equal(201);
        done();
      });
  });
});

describe('add /users with non admin rights', () => {
  it('responds with a 401 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"numaram", email:"nu@gmail.com", password:"nu@1234", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXVlbEBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidXNlcklkIjoiNjQ0ZjgxMzIxMjk2ZGQ4Yjg5YjgzZjRlIiwiaWF0IjoxNjgyOTM2ODQ1LCJleHAiOjE2ODMwMjMyNDV9.FCpS9F2l1mpB_gaGjYnRpRnLmlp1_ntmDsrRJqXQYi0")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
});

describe('add /users without token', () => {
  it('responds with a 401 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"mumaram", email:"mum@gmail.com", password:"mum@1234", isAdmin: false})
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
});


describe('update /users with admin rights', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .put('/users/editUser/644f92aab5944cfbbd71e7d7')
      .send({name:"Ehlll", email:"hells@gmail.com", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDRmN2JhZjE0YTg0NDEzODIwZWMzYmMiLCJpYXQiOjE2ODI5MzY0NjQsImV4cCI6MTY4MzAyMjg2NH0.csLwAtSfkY02qwZht5WYJulERQrfsGolYKGer_9i_qc")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Logout /users', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/logout')
      .send()
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDRmN2JhZjE0YTg0NDEzODIwZWMzYmMiLCJpYXQiOjE2ODI5MzY0NjQsImV4cCI6MTY4MzAyMjg2NH0.csLwAtSfkY02qwZht5WYJulERQrfsGolYKGer_9i_qc")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('signout sucess')
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Login /users', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/login')
      .send({email:"shivam@gmail.com", password:"shivam@1234"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).to.be.a('string');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Create /group', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/groups/create')
      .send({name:"politics", description:"chitchat over national topics"})
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDRmN2JhZjE0YTg0NDEzODIwZWMzYmMiLCJpYXQiOjE2ODI5MzY0NjQsImV4cCI6MTY4MzAyMjg2NH0.csLwAtSfkY02qwZht5WYJulERQrfsGolYKGer_9i_qc')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Group created successfully')
        done();
      });
  });
});

describe('Delete group by id /group', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .delete('/groups/644f8f6ad077c8fe49c3f2d1')
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDRmN2JhZjE0YTg0NDEzODIwZWMzYmMiLCJpYXQiOjE2ODI5MzY0NjQsImV4cCI6MTY4MzAyMjg2NH0.csLwAtSfkY02qwZht5WYJulERQrfsGolYKGer_9i_qc")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Group deleted successfully")
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('GET all the groups /', () => {
  it('responds with a message', (done) => {
    request(app)
      .get('/groups/groups')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

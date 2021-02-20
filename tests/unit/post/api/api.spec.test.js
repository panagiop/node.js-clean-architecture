/* eslint-disable no-param-reassign */
import sinon from 'sinon';
import request from 'request';
import chai from 'chai';
/* eslint no-unused-vars: "off" */
const should = chai.should();

import posts from '../../fixtures/posts';

const base = 'http://localhost:1234';

describe('API', () => {
  let getStub = null;
  let postStub = null;
  let putStub = null;

  beforeEach(() => {
    getStub = sinon.stub(request, 'get');
    postStub = sinon.stub(request, 'post');
    putStub = sinon.stub(request, 'put');
  });
  afterEach(() => {
    request.get.restore();
    request.post.restore();
    request.put.restore();
  });

  describe('GET /api/v1/posts', () => {
    it('should return all posts', (done) => {
      getStub.yields(
        null,
        posts.all.success.res,
        JSON.stringify(posts.all.success.body)
      );
      request.get(`${base}/api/v1/post`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // key-value pair of {"data": [3 posts objects]}
        body.data.length.should.eql(2);
        // the first object should have the right value for name
        body.data[0].title.should.eql('title1');
        done();
      });
    });
  });

  describe('GET /api/v1/post/:id', () => {
    it('should return a specific post', (done) => {
      const obj = posts.single.success;
      getStub.yields(null, obj.res, JSON.stringify(obj.body));
      request.get(
        `${base}/api/v1/posts/5fb1ad6afb45c431a842c394`,
        (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('success');
          body.data[0].title.should.eql('title1');
          done();
        }
      );
    });
    it('should throw an error if the post does not exist', (done) => {
      const obj = posts.single.failure;
      getStub.yields(null, obj.res, JSON.stringify(obj.body));
      request.get(
        `${base}/api/v1/posts/5fb1ad6afb45c431a842c666`,
        (err, res, body) => {
          res.statusCode.should.equal(404);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('error');
          body.message.should.eql('That post does not exist.');
          done();
        }
      );
    });
  });

  describe('POST /api/v1/posts', () => {
    it('should return the post that was added', (done) => {
      const options = {
        body: {
          isPublished: false,
          title: 'title3',
          description: 'description3',
          createdAt: '2020-11-15T22:36:26.566Z',
          userId: '5fb1ac21fb45c431a842c393'
        },
        json: true,
        url: `${base}/api/v1/posts`
      };
      const obj = posts.add.success;
      postStub.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].title.should.eql('title3');
        done();
      });
    });
  });

  describe('PUT /api/v1/posts', () => {
    it('should return the post that was updated', (done) => {
      const options = {
        body: { description: 'description3updated' },
        json: true,
        url: `${base}/api/v1/posts/5fb1ad6afb45c431a842c000`
      };
      const obj = posts.update.success;
      putStub.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].description.should.eql('description3updated');
        done();
      });
    });
  });
});

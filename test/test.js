'use strict';
const api = require('../api');
const db = require('../mongo');
const assert = require('assert');

describe('/api/', () => {
  it('returns test data', () => {
    assert.equal('test', api.root().name);
  });
});

describe('/api/profile/show/1', () => {
  it('returns json object', done => {
    setTimeout(() => {
      api.profileFromID(
        {params: {id: 1}},
        data => {
          assert.equal('error', data.error);
          done()
        });
    }, 2000);
  });
});

describe('/api/mondailist', () => {
  it('returns all fetched lists', done => {
    api.allList({}, data => {
      assert(data.length > 0);
      done();
    });
  });
});

describe('/api/userlist/1', () => {
  it('returns a list by user id', done => {
    api.listById({params:{id: 1}}, data => {
      assert(data);
      done();
    })
  })
});

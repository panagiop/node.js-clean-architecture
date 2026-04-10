import { expect } from 'chai';

import buildPostMongoFilter from '../../../../frameworks/database/mongoDB/repositories/postQueryBuilder';

describe('buildPostMongoFilter', () => {
  it('returns empty object for invalid input', () => {
    expect(buildPostMongoFilter(null)).to.eql({});
    expect(buildPostMongoFilter(undefined)).to.eql({});
  });

  it('passes through plain filters and skips pagination and search keys', () => {
    const uid = '507f1f77bcf86cd799439011';
    const filter = buildPostMongoFilter({
      userId: uid,
      page: 2,
      perPage: 5,
      q: 'hello',
      tag: 'news'
    });
    expect(filter.userId).to.equal(uid);
    expect(filter.page).to.equal(undefined);
    expect(filter.tags).to.equal('news');
    expect(filter.$or).to.be.an('array');
    expect(filter.$or).to.have.length(2);
  });

  it('escapes regex metacharacters in q', () => {
    const filter = buildPostMongoFilter({
      userId: 'x',
      q: 'a+b(c)'
    });
    const rx = filter.$or[0].title;
    expect(rx).to.be.instanceof(RegExp);
    expect(rx.test('a+b(c)')).to.equal(true);
  });

  it('omits empty q and empty tag', () => {
    const f1 = buildPostMongoFilter({ userId: 'u', q: '   ' });
    expect(f1.$or).to.equal(undefined);
    const f2 = buildPostMongoFilter({ userId: 'u', tag: '' });
    expect(f2.tags).to.equal(undefined);
  });
});

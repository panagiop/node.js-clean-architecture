/* eslint-disable no-unused-expressions */
import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';
const expect = chai.expect;

import Post from '../../../../src/entities/post';
import AddPost from '../../../../application/use_cases/post/add';
import FindAll from '../../../../application/use_cases/post/findAll';
import FindById from '../../../../application/use_cases/post/findById';
import PostDbRepository from '../../../../application/repositories/postDbRepository';

let dbRepository = null;

describe('Use cases', () => {
  beforeEach(() => {
    dbRepository = PostDbRepository();
  });

  describe('Fetch a specific post', () => {
    it('should fetch a post by id', () => {
      const stubPost = {
        title: faker.name.findName(),
        description: faker.name.findName(),
        createdAt: faker.date.past(),
        isPublished: false,
        userId: faker.random.uuid()
      };
      const correspondingPost = Post(
        stubPost.title,
        stubPost.description,
        stubPost.createdAt,
        stubPost.isPublished,
        stubPost.userId,
        dbRepository
      );
      const stubRepositoryFindById = sinon
        .stub(dbRepository, 'findById')
        .returns(correspondingPost);
      const post = FindById('5fb1b12a6ac3e23493ac82e4', dbRepository);
      expect(stubRepositoryFindById.calledOnce).to.be.true;
      sinon.assert.calledWith(
        stubRepositoryFindById,
        '5fb1b12a6ac3e23493ac82e4'
      );
      expect(post).to.eql(correspondingPost);
    });
  });

  describe('Fetch all posts', () => {
    it('should fetch all the posts succesfully', () => {
      const stubRepositoryFetchAll = sinon
        .stub(dbRepository, 'findAll')
        .returns(['post1', 'post2']);
      const posts = FindAll(dbRepository);
      expect(stubRepositoryFetchAll.calledOnce).to.be.true;
      expect(posts).to.eql(['post1', 'post2']);
    });
  });

  describe('Add new post', () => {
    it('should add a new post succesfully', () => {
      const stubValue = {
        title: faker.name.findName(),
        description: faker.name.findName(),
        createdAt: faker.date.past(),
        isPublished: false,
        userId: faker.random.uuid()
      };
      const pesristedPost = Post(
        stubValue.title,
        stubValue.description,
        stubValue.createdAt,
        stubValue.isPublished,
        stubValue.userId
      );
      const stubRepositoryAdd = sinon
        .stub(dbRepository, 'add')
        .returns(pesristedPost);
      const newPost = AddPost(
        stubValue.title,
        stubValue.description,
        stubValue.createdAt,
        stubValue.isPublished,
        stubValue.userId,
        dbRepository
      );
      expect(stubRepositoryAdd.calledOnce).to.be.true;
      expect(newPost.getTitle()).equals(stubValue.title);
      expect(newPost.getDescription()).equals(stubValue.description);
      expect(newPost.getCreatedAt()).equals(stubValue.createdAt);
      expect(newPost.isPublished()).equals(stubValue.isPublished);
      expect(newPost.getUserId()).equals(stubValue.userId);
    });
  });
});

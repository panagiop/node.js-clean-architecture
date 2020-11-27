export default {
  all: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            isPublished: false,
            _id: '5fb1ad6afb45c431a842c394',
            title: 'title1',
            description: 'description1',
            createdAt: '2020-11-15T22:36:26.566Z',
            userId: '5fb1ac21fb45c431a842c393'
          },
          {
            isPublished: false,
            _id: '5fb1b12a6ac3e23493ac82e4',
            title: 'title667',
            description: 'description667',
            createdAt: '2020-11-15T22:52:26.194Z',
            userId: '5fb1ac21fb45c431a842c393'
          }
        ]
      }
    }
  },
  single: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            isPublished: false,
            _id: '5fb1ad6afb45c431a842c394',
            title: 'title1',
            description: 'description1',
            createdAt: '2020-11-15T22:36:26.566Z',
            userId: '5fb1ac21fb45c431a842c393'
          }
        ]
      }
    },
    failure: {
      res: {
        statusCode: 404,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'error',
        message: 'That post does not exist.'
      }
    }
  },
  add: {
    success: {
      res: {
        statusCode: 201,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ad6afb45c431a842c000',
            isPublished: false,
            title: 'title3',
            description: 'description3',
            createdAt: '2020-11-15T22:36:26.566Z',
            userId: '5fb1ac21fb45c431a842c393'
          }
        ]
      }
    }
  },
  update: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            isPublished: false,
            title: 'title3',
            description: 'description3updated',
            createdAt: '2020-11-15T22:36:26.566Z',
            userId: '5fb1ac21fb45c431a842c393'
          }
        ]
      }
    }
  }
};

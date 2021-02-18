import UserModel from '../models/user';

export default function userRepositoryMongoDB() {
  const findByProperty = (params) => {
    return UserModel.find(omit(params, 'page', 'perPage'))
      .skip(
        parseInt(params.perPage) * parseInt(params.page) -
          parseInt(params.perPage)
      )
      .limit(parseInt(params.perPage));
  };

  const countAll = (params) => {
    return UserModel.countDocuments(omit(params, 'page', 'perPage'));
  }

  const findById = (id) => UserModel.findById(id).select('-password');

  const add = (userEntity) => {
    const newUser = new UserModel({
      username: userEntity.getUserName(),
      password: userEntity.getPassword(),
      email: userEntity.getEmail(),
      role: userEntity.getRole(),
      createdAt: new Date()
    });

    return newUser.save();
  };

  // move it to a proper place
  function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
  }

  return {
    findByProperty,
    countAll,
    findById,
    add
  };
}

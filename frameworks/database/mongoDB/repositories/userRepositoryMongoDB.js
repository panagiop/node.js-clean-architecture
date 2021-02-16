import UserModel from '../models/user';

export default function userRepositoryMongoDB() {
  const findAll = () => UserModel.find();

  const findByProperty = (params) => UserModel.find(params);

  const findById = (id) => UserModel.findById(id);

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

  return {
    findAll,
    findByProperty,
    findById,
    add
  };
}

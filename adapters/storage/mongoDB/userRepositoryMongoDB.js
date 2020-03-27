import UserModel from '../../../frameworks/database/mongoDB/models/user';

export default function UserRerpositoryMongoDB() {
  const findAll = () => UserModel.find();

  const findByProperty = (params) => UserModel.find(params);

  const findById = (id) => UserModel.findById(id);

  const add = (userEntity) => {
    const newUser = new UserModel({
      username: userEntity.getUserName(),
      password: userEntity.getHashedPassword(),
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

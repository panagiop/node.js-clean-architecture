export default function userRepository(repository) {
  const findAll = () => repository.findAll();
  const findByProperty = (params) => repository.findByProperty(params);
  const findById = (id) => repository.findById(id);
  const add = (user) => repository.add(user);
  const deleteById = (id) => repository.deleteById(id);

  return {
    findAll,
    findByProperty,
    findById,
    add,
    deleteById
  };
}

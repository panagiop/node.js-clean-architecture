export default function PostRepository(repository) {
  const findAll = () => repository.findAll();
  const findById = (id) => repository.findById(id);
  const add = (post) => repository.add(post);
  const updateById = (id, post) => repository.updateById(id, post);
  const deleteById = (id) => repository.deleteById(id);

  return {
    findAll,
    findById,
    add,
    updateById,
    deleteById
  };
}

export default function redisPostRepository(repository) {
  const setCache = (options) => repository.setCache(options);
  return {
    setCache
  };
}

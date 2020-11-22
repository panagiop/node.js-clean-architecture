export default function RedisPostRepository(repository) {
  const setCache = (options) => repository.setCache(options);
  return {
    setCache
  };
}

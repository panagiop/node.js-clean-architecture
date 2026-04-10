export default function redisPostRepository(repository) {
  const setCache = (options) => repository.setCache(options);
  const deleteCacheKey = (key) => repository.deleteCacheKey(key);
  return {
    setCache,
    deleteCacheKey
  };
}

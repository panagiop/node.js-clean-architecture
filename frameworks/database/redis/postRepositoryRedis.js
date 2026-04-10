export default function PostRepositoryRedis() {
  return function cachingClient(redisClient) {
    const setCache = ({ key, expireTimeSec, data }) =>
      redisClient.setex(key, expireTimeSec, data);

    const deleteCacheKey = (key) => redisClient.del(key);

    return {
      setCache,
      deleteCacheKey
    };
  };
}

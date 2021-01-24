export default function PostRepositoryRedis() {
  return function cachingClient(redisClient) {
    const setCache = ({ key, expireTimeSec, data }) =>
      redisClient.setex(key, expireTimeSec, data);
    return {
      setCache
    };
  };
}

export default function connection(redis, config) {
  const createRedisClient = function createRedisClient() {
    return redis.createClient(config.redis.uri);
  };
  createRedisClient().on('connect', () => {
    console.log('Connected to Redis!');
  });

  createRedisClient().on('error', (err) => {
    console.log(`Error  ${err}`);
  });

  return {
    createRedisClient
  };
}

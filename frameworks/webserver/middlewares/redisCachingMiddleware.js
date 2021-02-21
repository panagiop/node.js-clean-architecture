export default function redisCachingMiddleware(redisClient, key) {
  // eslint-disable-next-line func-names
  return function (req, res, next) {
    const params = req.params.id || '';
    redisClient.get(`${key}_${params}`, (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        return res.json(JSON.parse(data));
      }
      return next();
    });
  };
}

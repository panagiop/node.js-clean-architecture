export default function post({
  title,
  description,
  createdAt,
  isPublished = false,
  userId,
  tags = []
}) {
  return {
    getTitle: () => title,
    getDescription: () => description,
    getCreatedAt: () => createdAt,
    isPublished: () => isPublished,
    getUserId: () => userId,
    getTags: () => tags
  };
}

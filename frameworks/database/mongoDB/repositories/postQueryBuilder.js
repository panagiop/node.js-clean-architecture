import escapeRegex from '../../../../src/utils/escapeRegex';
import { coerceTagString } from '../../../../src/entities/normalizePostTags';

/** Query keys that are not direct Mongo field filters for PostModel.find */
const RESERVED_KEYS = new Set(['page', 'perPage', 'q', 'tag']);

/**
 * Builds a Mongo filter for listing posts from HTTP query / repository params.
 * Supports:
 * - `userId` and any other direct equality filters passed through (except reserved keys)
 * - `tag` — document must contain that tag (tags array)
 * - `q` — case-insensitive substring match on title OR description
 *
 * @param {Record<string, unknown>} rawParams
 * @returns {Record<string, unknown>}
 */
export default function buildPostMongoFilter(rawParams) {
  if (!rawParams || typeof rawParams !== 'object') {
    return {};
  }

  const filter = {};

  Object.keys(rawParams).forEach((key) => {
    if (RESERVED_KEYS.has(key)) {
      return;
    }
    const value = rawParams[key];
    if (value !== undefined && value !== null && value !== '') {
      filter[key] = value;
    }
  });

  const tagRaw = rawParams.tag;
  if (tagRaw !== undefined && tagRaw !== null) {
    const tag = coerceTagString(String(tagRaw).trim());
    if (tag) {
      filter.tags = tag;
    }
  }

  const qRaw = rawParams.q;
  if (qRaw !== undefined && qRaw !== null) {
    const q = String(qRaw).trim();
    if (q.length > 0) {
      const safe = escapeRegex(q);
      if (safe.length > 0) {
        const rx = new RegExp(safe, 'i');
        filter.$or = [{ title: rx }, { description: rx }];
      }
    }
  }

  return filter;
}

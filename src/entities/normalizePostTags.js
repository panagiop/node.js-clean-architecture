export const MAX_TAGS_PER_POST = 20;
export const MAX_TAG_LENGTH = 48;

function asTrimmedString(value) {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value).trim();
  }
  return '';
}

/**
 * Coerce mongoose / plain tag values into trimmed lowercase strings.
 * @param {unknown} value
 * @returns {string}
 */
export function coerceTagString(value) {
  const s = asTrimmedString(value);
  if (!s) {
    return '';
  }
  return s.toLowerCase().slice(0, MAX_TAG_LENGTH);
}

/**
 * Normalizes tags for create / replace operations.
 * - Trims, lowercases, truncates length
 * - Drops empties and duplicates (first occurrence wins)
 * - Caps how many tags are stored per post
 *
 * @param {unknown} input
 * @returns {string[]}
 */
export function normalizePostTags(input) {
  if (input === undefined || input === null) {
    return [];
  }

  if (!Array.isArray(input)) {
    throw new Error('tags must be an array');
  }

  const seen = new Set();
  const result = [];

  for (let i = 0; i < input.length; i += 1) {
    const normalized = coerceTagString(input[i]);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    result.push(normalized);
    if (result.length >= MAX_TAGS_PER_POST) {
      break;
    }
  }

  return result;
}

/**
 * Resolves tags on update: replace when the client sends `tags`, otherwise keep existing.
 * @param {unknown} existingTags — values from persistence (e.g. mongoose doc field)
 * @param {unknown} bodyTags — `req.body.tags` or undefined when omitted
 * @returns {string[]}
 */
export function tagsForUpdate(existingTags, bodyTags) {
  if (bodyTags !== undefined) {
    return normalizePostTags(bodyTags);
  }

  if (!Array.isArray(existingTags) || existingTags.length === 0) {
    return [];
  }

  return normalizePostTags(existingTags);
}

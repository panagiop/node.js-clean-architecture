import { expect } from 'chai';

import {
  MAX_TAGS_PER_POST,
  MAX_TAG_LENGTH,
  coerceTagString,
  normalizePostTags,
  tagsForUpdate
} from '../../../../src/entities/normalizePostTags';

describe('normalizePostTags', () => {
  describe('normalizePostTags', () => {
    it('returns empty array for null or undefined', () => {
      expect(normalizePostTags(null)).to.eql([]);
      expect(normalizePostTags(undefined)).to.eql([]);
    });

    it('throws when input is not an array', () => {
      expect(() => normalizePostTags('news')).to.throw('tags must be an array');
    });

    it('trims, lowercases, and removes duplicates', () => {
      expect(
        normalizePostTags([' News ', 'news', 'Draft', 'draft'])
      ).to.eql(['news', 'draft']);
    });

    it('drops empty entries after trim', () => {
      expect(normalizePostTags(['', '  ', 'ok'])).to.eql(['ok']);
    });

    it('coerces finite numbers to string tags', () => {
      expect(normalizePostTags([2024, 'alpha'])).to.eql(['2024', 'alpha']);
    });

    it('respects max tag length', () => {
      const long = 'a'.repeat(MAX_TAG_LENGTH + 10);
      const out = normalizePostTags([long]);
      expect(out[0].length).to.equal(MAX_TAG_LENGTH);
    });

    it('respects max number of tags', () => {
      const many = Array.from({ length: MAX_TAGS_PER_POST + 5 }, (_, i) => `t${i}`);
      expect(normalizePostTags(many).length).to.equal(MAX_TAGS_PER_POST);
    });
  });

  describe('coerceTagString', () => {
    it('returns empty for non-string primitives except finite numbers', () => {
      expect(coerceTagString(null)).to.equal('');
      expect(coerceTagString(undefined)).to.equal('');
      expect(coerceTagString({})).to.equal('');
    });
  });

  describe('tagsForUpdate', () => {
    it('replaces tags when body provides an array', () => {
      expect(tagsForUpdate(['old'], ['new'])).to.eql(['new']);
    });

    it('normalizes existing tags when body omits tags', () => {
      expect(tagsForUpdate([' Alpha ', 'alpha'], undefined)).to.eql(['alpha']);
    });

    it('allows clearing tags when body sends empty array', () => {
      expect(tagsForUpdate(['x'], [])).to.eql([]);
    });
  });
});

/**
 * Tests for AsyncStorage-backed ID helpers.
 *
 * We mock AsyncStorage so tests run in plain Node without a device.
 * The mock is a simple in-memory Map.
 */
import {
    getChatroomId,
    getClientId,
    getNewChatroomId,
    setChatroomId,
} from '@/lib/utils/utilities';

// ── Manual mock for AsyncStorage ───────────────────────────────────

const store = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(store.get(key) ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    store.set(key, value);
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    store.delete(key);
    return Promise.resolve();
  }),
}));

// Clear the fake store between tests so they stay independent
beforeEach(() => {
  store.clear();
});

// ── getClientId ────────────────────────────────────────────────────

describe('getClientId', () => {
  it('generates and stores an id on first call', async () => {
    const id = await getClientId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
    // Should now be persisted
    expect(store.get('clientid')).toBe(id);
  });

  it('returns the same id on subsequent calls', async () => {
    const first = await getClientId();
    const second = await getClientId();
    expect(second).toBe(first);
  });
});

// ── getChatroomId ──────────────────────────────────────────────────

describe('getChatroomId', () => {
  it('generates a new id when none exists', async () => {
    const id = await getChatroomId();
    expect(id.length).toBeGreaterThan(0);
    expect(store.get('chatroomid')).toBe(id);
  });

  it('returns the stored id on second call', async () => {
    const first = await getChatroomId();
    const second = await getChatroomId();
    expect(second).toBe(first);
  });
});

// ── getNewChatroomId ───────────────────────────────────────────────

describe('getNewChatroomId', () => {
  it('generates a fresh id (different from the previous one)', async () => {
    const original = await getChatroomId();
    const fresh = await getNewChatroomId();
    // Extremely unlikely to collide
    expect(fresh).not.toBe(original);
  });

  it('persists the new id', async () => {
    const fresh = await getNewChatroomId();
    expect(store.get('chatroomid')).toBe(fresh);
  });
});

// ── setChatroomId ──────────────────────────────────────────────────

describe('setChatroomId', () => {
  it('stores the exact id provided', async () => {
    await setChatroomId('my-custom-id');
    expect(store.get('chatroomid')).toBe('my-custom-id');
  });

  it('overwrites a previously stored id', async () => {
    await getChatroomId(); // generates one
    await setChatroomId('override');
    expect(store.get('chatroomid')).toBe('override');
  });
});

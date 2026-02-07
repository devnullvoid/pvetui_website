import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { useGithubStats } from './use-github-stats';

// Mock fetch globally
globalThis.fetch = vi.fn();

const mockRepoResponse = {
    stargazers_count: 100,
    language: 'TypeScript',
};
const mockReleaseResponse = {
    tag_name: 'v1.0.0',
};
const mockContributorsResponse = [{}, {}, {}]; // length 3
const mockReleasesResponse = [{}, {}]; // length 2

function createFetchResponse(data: unknown, ok: boolean = true) {
    return {
        ok,
        json: () => Promise.resolve(data),
        headers: {
            get: () => null,
        },
    };
}

describe('useGithubStats Performance Optimization', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.useFakeTimers({ toFake: ['Date'] });

        (globalThis.fetch as Mock).mockImplementation((url: unknown) => {
            if (typeof url === 'string') {
                if (url.includes('/repos/devnullvoid/pvetui/releases/latest')) {
                    return Promise.resolve(createFetchResponse(mockReleaseResponse));
                }
                if (url.includes('/contributors')) {
                    return Promise.resolve(createFetchResponse(mockContributorsResponse));
                }
                if (url.includes('/releases')) {
                    return Promise.resolve(createFetchResponse(mockReleasesResponse));
                }
            }
            // default repo
            return Promise.resolve(createFetchResponse(mockRepoResponse));
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.useRealTimers();
    });

    it('fetches data on first mount (cache miss)', async () => {
        const { result } = renderHook(() => useGithubStats());

        // Wait for loading to finish
        await waitFor(() => expect(result.current.loading).toBe(false));

        // Expect 4 fetch calls
        expect(globalThis.fetch).toHaveBeenCalledTimes(4);

        // Verify data is correct
        expect(result.current.stars).toBe(100);
    });

    it('uses cached data on subsequent mount (cache hit)', async () => {
        // First mount to populate cache
        const { result, unmount } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(globalThis.fetch).toHaveBeenCalledTimes(4);

        // Clear mocks to reset call count
        vi.clearAllMocks();
        unmount();

        // Second mount - should use cache
        const { result: result2 } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result2.current.loading).toBe(false));

        // Expect 0 fetch calls because cache is fresh
        expect(globalThis.fetch).toHaveBeenCalledTimes(0);
        expect(result2.current.stars).toBe(100);
    });

    it('refetches data when cache is stale', async () => {
        // First mount to populate cache
        const { result, unmount } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result.current.loading).toBe(false));

        vi.clearAllMocks();
        unmount();

        // Advance time by 1 hour + 1 second
        const newTime = new Date(Date.now() + 3600 * 1000 + 1000);
        vi.setSystemTime(newTime);

        // Second mount - cache is stale
        const { result: result2 } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result2.current.loading).toBe(false));

        // Expect 4 fetch calls because cache expired
        expect(globalThis.fetch).toHaveBeenCalledTimes(4);
    });

    it('falls back to stale cache on network error', async () => {
        // First mount to populate cache
        const { result, unmount } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result.current.loading).toBe(false));

        vi.clearAllMocks();
        unmount();

        // Advance time to make cache stale
        const newTime = new Date(Date.now() + 3600 * 1000 + 1000);
        vi.setSystemTime(newTime);

        // Mock network failure for the next attempt
        (globalThis.fetch as Mock).mockImplementation(() => Promise.resolve(createFetchResponse({}, false)));

        // Second mount
        const { result: result2 } = renderHook(() => useGithubStats());
        await waitFor(() => expect(result2.current.loading).toBe(false));

        // Expect fetch was attempted (4 times)
        expect(globalThis.fetch).toHaveBeenCalledTimes(4);

        // But we should still have data from the stale cache, not an error
        expect(result2.current.error).toBe(false);
        expect(result2.current.stars).toBe(100); // From stale cache
    });
});

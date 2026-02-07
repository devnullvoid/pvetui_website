import { useState, useEffect } from 'react'

interface GithubStats {
    stars: number
    version: string
    totalReleases: number
    contributors: number
    language: string
    loading: boolean
    error: boolean
}

const DEFAULT_STATS: GithubStats = {
    stars: 549,
    version: 'v1.0.16',
    totalReleases: 31,
    contributors: 6,
    language: 'Go',
    loading: true,
    error: false,
}

const CACHE_KEY = 'pvetui_github_stats'
const CACHE_TTL = 3600 * 1000 // 1 hour

function parseLinkHeader(header: string | null): number | null {
    if (!header) return null

    // Split into parts (next, last, etc)
    const parts = header.split(',')
    const lastPart = parts.find(part => part.includes('rel="last"'))

    if (lastPart) {
        const match = lastPart.match(/[?&]page=(\d+)/)
        if (match) {
            return parseInt(match[1])
        }
    }
    return null
}

export function useGithubStats(): GithubStats {
    const [stats, setStats] = useState<GithubStats>(DEFAULT_STATS)

    useEffect(() => {
        const fetchStats = async () => {
            let cachedData: { timestamp: number; data: GithubStats } | null = null

            try {
                const stored = localStorage.getItem(CACHE_KEY)
                if (stored) {
                    cachedData = JSON.parse(stored)
                    // If cache is fresh, use it and return
                    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
                        setStats(cachedData.data)
                        return
                    }
                }
            } catch (e) {
                console.warn('Failed to parse cached stats', e)
            }

            try {
                const headers = { Accept: 'application/vnd.github.v3+json' }

                const [repoRes, releaseRes, contributorsRes, releasesRes] = await Promise.all([
                    fetch('https://api.github.com/repos/devnullvoid/pvetui', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/releases/latest', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/contributors?per_page=1&anon=true', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/releases?per_page=1', { headers })
                ])

                if (!repoRes.ok) throw new Error('Failed to fetch repo stats')

                const repoData = await repoRes.json()

                // Version
                let version = DEFAULT_STATS.version
                if (releaseRes.ok) {
                    const releaseData = await releaseRes.json()
                    version = releaseData.tag_name || DEFAULT_STATS.version
                }

                // Contributors count
                let contributors = DEFAULT_STATS.contributors
                const contributorsCount = parseLinkHeader(contributorsRes.headers.get('link'))
                if (contributorsCount !== null) {
                    contributors = contributorsCount
                } else if (contributorsRes.ok) {
                    // If no link header, but request ok, implies only 1 page aka <= 1 item
                    // Since we requested per_page=1, if total > 1 we MUST get link header.
                    // If no link header, it means count is 0 or 1.
                    const data = await contributorsRes.json()
                    if (Array.isArray(data)) contributors = data.length
                }

                // Releases count
                let totalReleases = DEFAULT_STATS.totalReleases
                const releasesCount = parseLinkHeader(releasesRes.headers.get('link'))
                if (releasesCount !== null) {
                    totalReleases = releasesCount
                } else if (releasesRes.ok) {
                    const data = await releasesRes.json()
                    if (Array.isArray(data)) totalReleases = data.length
                }

                const newStats = {
                    stars: repoData.stargazers_count,
                    version,
                    totalReleases,
                    contributors,
                    language: repoData.language || DEFAULT_STATS.language,
                    loading: false,
                    error: false,
                }

                setStats(newStats)

                // Update cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: newStats
                }))

            } catch (error) {
                console.error('Error fetching GitHub stats:', error)

                // Fallback to stale cache if available
                if (cachedData) {
                    setStats(cachedData.data)
                } else {
                    setStats(prev => ({ ...prev, loading: false, error: true }))
                }
            }
        }

        fetchStats()
    }, [])

    return stats
}

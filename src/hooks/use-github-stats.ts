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

export function useGithubStats(): GithubStats {
    const [stats, setStats] = useState<GithubStats>({
        stars: 549, // fallback
        version: 'v1.0.16', // fallback
        totalReleases: 31, // fallback
        contributors: 6, // fallback
        language: 'Go', // fallback
        loading: true,
        error: false,
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const headers = { Accept: 'application/vnd.github.v3+json' }

                // Parallel requests
                const [repoRes, releaseRes, contributorsRes, releasesRes] = await Promise.all([
                    fetch('https://api.github.com/repos/devnullvoid/pvetui', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/releases/latest', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/contributors?per_page=1&anon=true', { headers }),
                    fetch('https://api.github.com/repos/devnullvoid/pvetui/releases?per_page=1', { headers })
                ])

                if (!repoRes.ok) throw new Error('Failed to fetch repo stats')

                const repoData = await repoRes.json()

                // Version
                let version = stats.version
                if (releaseRes.ok) {
                    const releaseData = await releaseRes.json()
                    version = releaseData.tag_name || stats.version
                }

                // Contributors count (using Link header)
                let contributors = stats.contributors
                const contributorsLink = contributorsRes.headers.get('Link')
                if (contributorsLink) {
                    const match = contributorsLink.match(/page=(\d+)&[^>]*>; rel="last"/)
                    if (match) contributors = parseInt(match[1])
                }

                // Releases count (using Link header)
                let totalReleases = stats.totalReleases
                const releasesLink = releasesRes.headers.get('Link')
                if (releasesLink) {
                    const match = releasesLink.match(/page=(\d+)&[^>]*>; rel="last"/)
                    if (match) totalReleases = parseInt(match[1])
                } else if (releasesRes.ok) {
                    // If no link header, maybe it's less than 1 page?
                    // Actually querying with per_page=1 usually forces pagination if there's more than 1.
                    // If there's no link header with per_page=1, it means total <= 1.
                }

                setStats({
                    stars: repoData.stargazers_count,
                    version,
                    totalReleases,
                    contributors,
                    language: repoData.language || stats.language,
                    loading: false,
                    error: false,
                })
            } catch (error) {
                console.error('Error fetching GitHub stats:', error)
                setStats(prev => ({ ...prev, loading: false, error: true }))
            }
        }

        fetchStats()
    }, [])

    return stats
}

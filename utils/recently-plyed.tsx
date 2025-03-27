import type { Game } from "@/data/game"

// 最大存储的最近玩过游戏数量
const MAX_RECENT_GAMES = 30
const STORAGE_KEY = "recently_played_games"

/**
 * 添加游戏到最近玩过列表
 * @param game 游戏对象
 */
export function addRecentlyPlayedGame(game: Game): void {
    // 仅在客户端执行
    if (typeof window === "undefined") return

    try {
        // 获取现有的最近玩过游戏
        const recentGames = getRecentlyPlayedGames()

        // 检查游戏是否已经在列表中
        const existingIndex = recentGames.findIndex((g) => g.id === game.id)

        // 如果已存在，先移除它
        if (existingIndex !== -1) {
            recentGames.splice(existingIndex, 1)
        }

        // 将游戏添加到列表开头
        recentGames.unshift(game)

        // 如果超过最大数量，移除最旧的
        if (recentGames.length > MAX_RECENT_GAMES) {
            recentGames.pop()
        }

        // 保存回本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentGames))
    } catch (error) {
        console.error("保存最近玩过的游戏时出错:", error)
    }
}

/**
 * 获取最近玩过的游戏列表
 * @returns 游戏数组
 */
export function getRecentlyPlayedGames(): Game[] {
    // 仅在客户端执行
    if (typeof window === "undefined") return []

    try {
        const storedGames = localStorage.getItem(STORAGE_KEY)
        if (!storedGames) return []

        return JSON.parse(storedGames) as Game[]
    } catch (error) {
        console.error("获取最近玩过的游戏时出错:", error)
        return []
    }
}

/**
 * 清除最近玩过的游戏列表
 */
export function clearRecentlyPlayedGames(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
}


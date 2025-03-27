import type { Game } from "@/data/game"

// 最大存储的喜欢的游戏数量
const MAX_RECENT_GAMES = 20
const STORAGE_KEY = "liked_games"

/**
 * 添加游戏到喜欢的列表
 * @param game 游戏对象
 */
export function addLikedGame(game: Game): void {
    // 仅在客户端执行
    if (typeof window === "undefined") return

    try {
        // 获取现有的喜欢的游戏
        const likedGames = getLikedGames()

        // 检查游戏是否已经在列表中
        const existingIndex = likedGames.findIndex((g) => g.id === game.id)

        // 如果已存在，先移除它
        if (existingIndex !== -1) {
            likedGames.splice(existingIndex, 1)
        }

        // 将游戏添加到列表开头
        likedGames.unshift(game)

        // 如果超过最大数量，移除最旧的
        if (likedGames.length > MAX_RECENT_GAMES) {
            likedGames.pop()
        }

        // 保存回本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(likedGames))
    } catch (error) {
        console.error("保存喜欢的的游戏时出错:", error)
    }
}

/**
 * 获取喜欢的的游戏列表
 * @returns 游戏数组
 */
export function getLikedGames(): Game[] {
    // 仅在客户端执行
    if (typeof window === "undefined") return []

    try {
        const storedGames = localStorage.getItem(STORAGE_KEY)
        if (!storedGames) return []

        return JSON.parse(storedGames) as Game[]
    } catch (error) {
        console.error("获取喜欢的的游戏时出错:", error)
        return []
    }
}

/**
 * 清除喜欢的的游戏列表
 */
export function clearLikedGames(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
}


/**
 * 检查游戏是否被喜欢
 * @param game 游戏对象
 * @returns 布尔值
 */
export function isGameLiked(game: Game): boolean {
    const likedGames = getLikedGames()
    return likedGames.some((g) => g.id === game.id)
}

/**
 * 删除喜欢的游戏
 * @param game 游戏对象
 */

export function removeLikedGame(game: Game): void {
    const likedGames = getLikedGames()
    const index = likedGames.findIndex((g) => g.id === game.id)
    if (index !== -1) {
        likedGames.splice(index, 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(likedGames))
    }
}
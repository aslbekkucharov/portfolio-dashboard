export interface Post {
    title: string
    content: string
    excerpt: string
    isActive: boolean
}

export interface PostResponse extends Post {
    id: number
    title: string
    content: string
    isActive: boolean
}

export interface User {
    id: number
    role: string
    name: string
    username: string
}

export interface AuthSuccess {
    user: User
    token: string
}
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

export interface Experience {
    companyTitle: string
    aboutCompany: string
    companyStack: string[]
    period: { from: Date | string, to: Date | string | null }
}

export interface TabItem {
    key: string
    label: string
    icon: React.ReactElement
}

export interface About {
    bio: string
    fullname: string
    position: string
    volunteering: string
    ownedSkills: string[]
    globalUsername: string
    experiences: Experience[]
}
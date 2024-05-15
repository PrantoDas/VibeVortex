export interface Post {
    id: string;
    author: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    content: string;
    timestamp: Date;
    likes: number;
    liked: boolean;
    commentsCount: number;
    showComments?: boolean;
    isPublic: boolean;
    shareEnabled: boolean;
}

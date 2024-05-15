export interface Comment {
    id: string;
    postId: string;
    authorName: string;
    authorPicture: string;
    content: string;
    timestamp: Date;
    likes: number;
    liked: boolean;
}
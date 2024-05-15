import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Post } from '../../../shared/models/post.interface';
import he from 'he';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:3002/posts';
    private postCreatedSubject = new Subject<Post>();


    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl);
    }

    createPost(postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'liked' | 'commentsCount' | 'showComments' | 'author' | 'shareEnabled'>): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, postData)
            .pipe(
                tap((createdPost: Post) => {
                    this.postCreatedSubject.next(createdPost);
                })
            );
    }

    getPostCreatedObservable(): Observable<Post> {
        return this.postCreatedSubject.asObservable();
    }

    encodePostContent(content: string): string {
        return encodeURIComponent(content);
    }

    decodePostContent(content: string): string {
        return decodeURIComponent(content);
    }

    htmlDecode(text: string): string {
        return he.decode(text);
    }
}

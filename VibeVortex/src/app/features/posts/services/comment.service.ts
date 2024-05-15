import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = 'http://localhost:3002/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}/${postId}`).pipe(delay(500));
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsUrl}/${comment.postId}`, comment).pipe(delay(500));
  }

  likeComment(commentId: string): Observable<any> {
    const url = `${this.commentsUrl}/${commentId}/like`;
    return this.http.post(url, {});
  }

  loadMoreComments(offset: number, limit: number): Observable<Comment[]> {
    const paginatedUrl = `${this.commentsUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<Comment[]>(paginatedUrl);
  }
}

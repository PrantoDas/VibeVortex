import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment'
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MomentModule } from 'ngx-moment';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MomentModule
  ],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  @Input() postId!: string;
  @Input() commentsCount!: number;
  comments: Comment[] = [];
  newCommentText: string = '';
  isLoading: boolean = false;
  isLoadingMore = false;
  showEmojiPicker: boolean = false;
  error: string = '';

  constructor(private commentService: CommentService, private postService: PostService) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.isLoading = true;
    this.commentService.getComments(this.postId).subscribe({
      next: (data) => {
        this.comments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load comments. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  addComment() {
    if (!this.newCommentText.trim()) return;

    const newComment: Comment = {
      id: '',
      postId: this.postId,
      authorName: 'Current User', // Replace with dynamic data
      authorPicture: 'path_to_profile_picture', // Replace with dynamic data
      content: this.newCommentText,
      timestamp: new Date(),
      likes: 0,
      liked: false,
    };

    this.commentService.postComment(newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newCommentText = '';
      },
      error: (err) => {
        this.error = 'Failed to post comment. Please try again.';
      }
    });
  }

  toggleLike(comment: Comment) {
    comment.likes += comment.liked ? -1 : 1;
    comment.liked = !comment.liked;

    this.commentService.likeComment(comment.id).subscribe({
      next: (data) => {
        comment.likes = data.likes;
      },
      error: (err) => {
        this.error = 'Failed to like comment. Please try again.';
      }
    });
  }

  loadMoreComments() {
    this.isLoadingMore = true;
    this.commentService.getComments(this.postId).subscribe({
      next: (data) => {
        this.comments.push(...data);
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.error = 'Failed to load comments. Please try again later.';
        this.isLoadingMore = false;
      }
    });
  }

  htmlDecode(text: string): string {
    return this.postService.htmlDecode(text);
  }
}

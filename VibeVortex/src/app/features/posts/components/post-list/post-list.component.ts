import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { Post } from '../../../../shared/models/post.interface';
import { PostService } from '../../services/post.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentModule } from 'ngx-moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MomentModule,
    CommentSectionComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts: Post[] = [];
  postCreatedSubscription!: Subscription;

  constructor(protected postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.subscribeToPostCreation();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  toggleLike(post: Post): void {
    post.likes += post.liked ? -1 : 1;
    post.liked = !post.liked;
  }

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }

  sharePost(post: Post): void {
    // Logic to share a post
  }

  subscribeToPostCreation() {
    this.postCreatedSubscription = this.postService.getPostCreatedObservable().subscribe(createdPost => {
      // Add the newly created post to the beginning of the posts array
      this.posts.unshift(createdPost);
    });
  }

  ngOnDestroy(): void {
    this.postCreatedSubscription.unsubscribe();
  }
}

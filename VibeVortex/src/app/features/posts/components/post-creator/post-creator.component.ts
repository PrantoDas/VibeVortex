import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PostService } from '../../services/post.service';
import { Post } from '../../../../shared/models/post.interface';

@Component({
  selector: 'app-post-creator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    QuillModule,
  ],
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  postContent: string = '';
  isPublic: boolean = true;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(private postService: PostService) { }

  submitPost(): void {
    if (this.postContent) {
      // Explicitly create the post object
      const newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'liked' | 'commentsCount' | 'showComments' | 'author' | 'shareEnabled'> = {
        content: this.postService.encodePostContent(this.postContent),
        isPublic: this.isPublic,
      };

      // Pass the newPost object to the service
      this.postService.createPost(newPost).subscribe({
        next: (response) => {
          console.log('Post was successful', response);
          this.postContent = '';
        },
        error: (error) => {
          console.error('There was an error posting', error);
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreatorComponent } from "../posts/components/post-creator/post-creator.component";
import { PostListComponent } from "../posts/components/post-list/post-list.component";

@Component({
    selector: 'app-newsfeed',
    standalone: true,
    templateUrl: './newsfeed.component.html',
    styleUrls: ['./newsfeed.component.css'],
    imports: [
        CommonModule,
        PostCreatorComponent,
        PostListComponent
    ]
})
export class NewsfeedComponent {

}

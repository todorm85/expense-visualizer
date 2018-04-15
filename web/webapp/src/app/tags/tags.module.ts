import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagNavigationComponent } from './tag-navigation/tag-navigation.component';
import { Route } from '@angular/router';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagCreateComponent } from './tag-create/tag-create.component';

const routes = <Route[]>[
  {
    path: 'tags', component: TagNavigationComponent, children: [
      { path: '', component: TagsListComponent },
      { path: 'create', component: TagCreateComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TagNavigationComponent]
})
export class TagsModule { }

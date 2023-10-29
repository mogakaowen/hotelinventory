import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment.component';
import { resolveGuard } from './guards/resolve.guard';

const routes: Routes = [{ path: '', component: CommentComponent, resolve: { comments: resolveGuard } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }

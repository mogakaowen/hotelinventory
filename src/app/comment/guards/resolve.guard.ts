import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CommentService } from '../comment.service';
import { inject } from '@angular/core';
import { Comments } from '../comments';

export const resolveGuard: ResolveFn<Comments[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CommentService).getComments();
};

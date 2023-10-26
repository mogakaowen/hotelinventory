import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { matchGuard } from './match.guard';

describe('matchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => matchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed, async, inject } from '@angular/core/testing';

import { DashAuthGuard } from './dash-auth.guard';

describe('DashAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashAuthGuard]
    });
  });

  it('should ...', inject([DashAuthGuard], (guard: DashAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

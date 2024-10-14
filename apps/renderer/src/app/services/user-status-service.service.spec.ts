import { TestBed } from '@angular/core/testing';

import { UserStatusServiceService } from './user-status-service.service';

describe('UserStatusServiceService', () => {
  let service: UserStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { UsersListServiceService } from './users-list.service';

describe('UsersListServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersListServiceService]
    });
  });

  it('should be created', inject([UsersListServiceService], (service: UsersListServiceService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { AccountExpirationService } from './account-expiration.service';

describe('AccountExpirationService', () => {
  let service: AccountExpirationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountExpirationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

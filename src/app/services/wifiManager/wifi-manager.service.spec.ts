import { TestBed } from '@angular/core/testing';

import { WifiManagerService } from './wifi-manager.service';

describe('WifiManagerService', () => {
  let service: WifiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DiscosdbService } from './discosdb.service';

describe('DiscosdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscosdbService = TestBed.get(DiscosdbService);
    expect(service).toBeTruthy();
  });
});

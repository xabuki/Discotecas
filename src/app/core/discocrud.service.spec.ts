import { TestBed } from '@angular/core/testing';

import { DiscocrudService } from './discocrud.service';

describe('DiscocrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscocrudService = TestBed.get(DiscocrudService);
    expect(service).toBeTruthy();
  });
});

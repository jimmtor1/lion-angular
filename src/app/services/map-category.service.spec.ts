import { TestBed } from '@angular/core/testing';

import { MapCategoryService } from './map-category.service';

describe('MapCategoryService', () => {
  let service: MapCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

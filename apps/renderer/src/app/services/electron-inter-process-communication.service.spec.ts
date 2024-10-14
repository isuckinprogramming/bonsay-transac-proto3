import { TestBed } from '@angular/core/testing';

import { ElectronInterProcessCommunicationService } from './electron-inter-process-communication.service';

describe('ElectronInterProcessCommunicationService', () => {
  let service: ElectronInterProcessCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronInterProcessCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

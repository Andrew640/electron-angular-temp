import { TestBed } from '@angular/core/testing';

import { CpuTempService } from './cpu-temp.service';

describe('CpuTempService', () => {
    let service: CpuTempService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CpuTempService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

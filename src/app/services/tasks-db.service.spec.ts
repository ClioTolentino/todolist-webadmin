import { TestBed, inject } from '@angular/core/testing';

import { TasksDbService } from './tasks-db.service';

describe('TasksDbService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TasksDbService]
        });
    });

    it('should be created', inject([TasksDbService], (service: TasksDbService) => {
        expect(service).toBeTruthy();
    }));
});

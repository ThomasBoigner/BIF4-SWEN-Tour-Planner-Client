import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackupService {
    private readonly backupUrl: string;

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
    ) {
        this.backupUrl = 'http://localhost:8080/api/backup';
    }

    public exportTour(id: string) {
        this.logger.debug(`Trying to backup tour with id ${id}`);
        return this.http.get(`${this.backupUrl}/export/${id}`, {
            responseType: 'blob',
            observe: 'response',
        });
    }

    public importTour(file: File): Observable<object> {
        this.logger.debug(`Trying to restore tour with file ${file.name}`);

        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.backupUrl}/import`, formData);
    }
}

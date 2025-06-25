import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

@Injectable({ providedIn: 'root' })
export class BackupService {
    private readonly backupUrl: string;

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
    ) {
        this.backupUrl = 'http://localhost:8080/api/backup';
    }

    public backupTour(id: string) {
        this.logger.debug(`Trying to backup tour with id ${id}`);
        this.http.get(`${this.backupUrl}/export/${id}`, {
            responseType: 'blob',
            observe: 'response'
        }).subscribe(response => {
            if (!response.body) {
                return
            }

            const contentDisposition = response.headers.get('content-disposition');
            const match = contentDisposition?.match(/filename="?(.+?)"?$/);

            const url = window.URL.createObjectURL(response.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = match ? match[1] : 'backup.json';
            a.click();
        });
    }
}

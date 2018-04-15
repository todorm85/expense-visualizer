import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-transactions-import',
    templateUrl: './transactions-import.component.html',
    styleUrls: ['./transactions-import.component.css']
})
export class TransactionsImportComponent implements OnInit {
    fileToUpload: File = null;
    isUploading: Boolean;
    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
    }

    onFileSelected(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    onFileUpload() {
        if (!this.fileToUpload) {
            return;
        }

        const endpoint = '/api/transactions/import';
        const formData: FormData = new FormData();
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
        this.isUploading = true;
        this.httpClient
            .post(endpoint, formData)
            .subscribe(resp => {
                this.isUploading = false;
            }, error => {
                console.log(error);
            });
    }
}

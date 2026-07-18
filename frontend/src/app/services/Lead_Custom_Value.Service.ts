import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable({
    providedIn: 'root'
})
export class Lead_Custom_Value_Service {
    constructor(private http: HttpClient) {}

    Save_Lead_Custom_Value(Lead_Custom_Value_: any): Observable<any> {
        return this.http.post(environment.BasePath + 'Lead_Custom_Value/Save_Lead_Custom_Value/', Lead_Custom_Value_);
    }

    Get_Lead_Custom_Values(Lead_Id: number): Observable<any> {
        return this.http.get(environment.BasePath + 'Lead_Custom_Value/Get_Lead_Custom_Values/' + Lead_Id);
    }

    uploadFile(file) {
        const contentType = file.type;
        const bucket = new AWS.S3({
            accessKeyId: 'AKIAUP77UXYN6GAKGZ5L',
            secretAccessKey: '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',
            region: 'ap-south-1'
        });
        const params = {
            Bucket: 'res-erp',
            Key: file.name,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };
        return new Promise((resolve, reject) => {
            bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    reject(err);
                } else {
                    console.log('Successfully uploaded file.', data);
                    resolve(data);
                }
            });
        });
    }
}

import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string = '';
  constructor(private fileUploadService: FileUploadService) { }

  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadCsv(this.selectedFile).subscribe(
        (response: any) => {
          // Handle the successful upload response (ensure it is in the expected JSON format)
          this.uploadResponse = response.message;  // Assuming the server returns { message: '...' }
        },
        (error: any) => {
          // If the error response is not a JSON, log and display the error message
          if (error.error && error.error.message) {
            this.uploadResponse = 'Error uploading file: ' + error.error.message;
          } else {
            this.uploadResponse = 'Unknown error occurred: ' + (error.message || error.statusText);
          }
        }
      );
    } else {
      this.uploadResponse = 'Please select a file first.';
    }
  }

}

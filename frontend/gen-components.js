const fs = require('fs');
const path = require('path');

const components = [
  { category: 'Contacts', name: 'Designation', folder: 'Designation', filePrefix: 'designation', endpoint: 'designation', className: 'Designation' },
  { category: 'Requirement_Profile', name: 'ServiceProduct', folder: 'ServiceProduct', filePrefix: 'service-product', endpoint: 'service-product', className: 'ServiceProduct' },
  { category: 'Market_Study', name: 'MarketSystem', folder: 'MarketSystem', filePrefix: 'market-system', endpoint: 'market-system', className: 'MarketSystem' },
  { category: 'Pipeline_Stage_Pulse', name: 'PipelineStage', folder: 'PipelineStage', filePrefix: 'pipeline-stage', endpoint: 'pipeline-stage', className: 'PipelineStage' },
  { category: 'Pipeline_Stage_Pulse', name: 'Pulse', folder: 'Pulse', filePrefix: 'pulse', endpoint: 'pulse', className: 'Pulse' },
  { category: 'Pipeline_Stage_Pulse', name: 'TargetStage', folder: 'TargetStage', filePrefix: 'target-stage', endpoint: 'target-stage', className: 'TargetStage' },
  { category: 'Assignment', name: 'Branch', folder: 'Branch', filePrefix: 'branch', endpoint: 'branch', className: 'Branch' },
  { category: 'Assignment', name: 'Department', folder: 'Department', filePrefix: 'department', endpoint: 'department', className: 'Department' },
  { category: 'Follow_up_Automation', name: 'Workflow', folder: 'Workflow', filePrefix: 'workflow', endpoint: 'workflow', className: 'Workflow' }
];

const basePath = 'd:/ufs project/neotronics/frontend/src/app';
const compBasePath = `${basePath}/modules/admin/Lead_Config`;
const serviceBasePath = `${basePath}/services/lead_config`;

components.forEach(comp => {
  // Service
  const serviceDir = `${serviceBasePath}/${comp.category.toLowerCase()}`;
  fs.mkdirSync(serviceDir, { recursive: true });
  const serviceFile = `${serviceDir}/${comp.filePrefix}.service.ts`;
  
  const serviceCode = `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ${comp.className}Service {
  private apiUrl = environment.BasePath + '/lead-config/${comp.endpoint}';

  constructor(private http: HttpClient) { }

  get${comp.className}s(search: string = '', page: number = 1): Observable<any> {
    return this.http.post<any>(\`\${this.apiUrl}/search\`, { search, page });
  }
}
`;
  fs.writeFileSync(serviceFile, serviceCode);

  // Component
  const compDir = `${compBasePath}/${comp.category}/${comp.folder}`;
  fs.mkdirSync(compDir, { recursive: true });
  
  // HTML
  const htmlFile = `${compDir}/${comp.filePrefix}.component.html`;
  const htmlCode = `<app-common-table 
  [title]="'Manage ${comp.name.replace(/([A-Z])/g, ' $1').trim()}'"
  [data]="data" 
  [columns]="columns" 
  [isLoading]="isLoading"
  [pageIndex]="pageIndex"
  [pageSize]="pageSize"
  [totalCount]="totalCount"
  (search)="onSearch($event)"
  (pageChange)="onPageChange($event)"
  (add)="onAdd()"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)">
</app-common-table>
`;
  fs.writeFileSync(htmlFile, htmlCode);

  // CSS
  const cssFile = `${compDir}/${comp.filePrefix}.component.css`;
  fs.writeFileSync(cssFile, `/* ${comp.className}Component Styles */\n`);

  // TS
  const tsFile = `${compDir}/${comp.filePrefix}.component.ts`;
  // Calculate relative path for service import
  // Comp is at modules/admin/Lead_Config/Category/Folder
  // Service is at services/lead_config/category
  // Diff: ../../../../../services/lead_config/category/
  const relativeServicePath = `../../../../../services/lead_config/${comp.category.toLowerCase()}/${comp.filePrefix}.service`;
  
  const tsCode = `import { Component, OnInit } from '@angular/core';
import { ${comp.className}Service } from '${relativeServicePath}';

@Component({
  selector: 'app-${comp.filePrefix}',
  templateUrl: './${comp.filePrefix}.component.html',
  styleUrls: ['./${comp.filePrefix}.component.css']
})
export class ${comp.className}Component implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  columns = [
    { key: 'name', label: 'Name' }
  ];

  constructor(private ${comp.className.toLowerCase()}Service: ${comp.className}Service) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.${comp.className.toLowerCase()}Service.get${comp.className}s(this.searchText, this.pageIndex).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res && res.length > 0) {
          this.data = res;
          this.totalCount = res[0].TotalCount || res.length;
        } else if (res && Array.isArray(res) && res.length > 0 && Array.isArray(res[0])) {
          this.data = res[0];
          this.totalCount = (res[0][0] && res[0][0].TotalCount) ? res[0][0].TotalCount : res[0].length;
        } else {
          this.data = [];
          this.totalCount = 0;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching data:', error);
        this.data = [];
      }
    );
  }

  onSearch(term: string) {
    this.searchText = term;
    this.pageIndex = 1;
    this.loadData();
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.loadData();
  }

  onAdd() {
    console.log('Add new ${comp.name}');
  }

  onEdit(item: any) {
    console.log('Edit ${comp.name}:', item);
  }

  onDelete(item: any) {
    console.log('Delete ${comp.name}:', item);
  }
}
`;
  fs.writeFileSync(tsFile, tsCode);

});

console.log('All components and services generated successfully.');

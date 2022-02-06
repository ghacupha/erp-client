import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'erp/file-type',
        data: { pageTitle: 'ERP | File Types' },
        loadChildren: () => import('./file-type/file-type.module').then(m => m.ErpServiceFileTypeModule),
      },
      {
        path: 'erp/file-upload',
        data: { pageTitle: 'ERP | File Uploads' },
        loadChildren: () => import('./file-upload/file-upload.module').then(m => m.ErpServiceFileUploadModule),
      },
      {
        path: 'erp/message-token',
        data: { pageTitle: 'ERP | Message Tokens' },
        loadChildren: () => import('./message-token/message-token.module').then(m => m.ErpServiceMessageTokenModule),
      }
    ])
  ]
})
export class ErpFilesModule {

}

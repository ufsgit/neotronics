# Netronics Project Documentation

## 1. Project Overview

Netronics is a legacy business management application with an Angular frontend and a Node.js/Express backend. The system appears to support quotation, sales, purchases, delivery orders, invoices, stock, leads, reports, account vouchers, and administration masters.

Primary workspace:

```text
C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics
```

Main folders:

```text
frontend/   Angular 8 + Angular Material + Cordova frontend
backend/    Node.js + Express + MySQL backend
```

## 2. Technology Stack

### Frontend

Location:

```text
frontend/
```

Important versions from `frontend/package.json` and `package-lock.json`:

```text
Angular Core: 8.0.0
Angular CLI: 8.x, lockfile resolves to 8.3.29
@angular-devkit/build-angular: 0.803.29
Webpack: 4.39.2
TypeScript: 3.4.x
RxJS: 6.5.2
Angular Material: 8.0.1
Cordova Android: 8.1.0
```

### Backend

Location:

```text
backend/
```

Main backend dependencies:

```text
Express: 4.17.1
MySQL / MySQL2
Socket.IO: 2.3.0
Nodemon: 2.0.16
Puppeteer
Multer
```

Backend entry points:

```text
backend/app.js
backend/bin/ubillmlm
```

Backend start script:

```json
"start": "nodemon ./bin/ubillmlm"
```

## 3. Recommended Node.js Version

This project is a legacy Angular 8 application using Webpack 4. It should not be built with modern Node versions such as Node 20, 22, or 24.

Recommended:

```text
Node.js 16.20.2
```

Stricter historical match for Angular 8:

```text
Node.js 12.22.12
```

Avoid for this project:

```text
Node.js 24.x
```

Reason: Webpack 4 uses older crypto hashing behavior that fails under modern OpenSSL rules in newer Node versions, producing:

```text
ERR_OSSL_EVP_UNSUPPORTED
error:0308010C:digital envelope routines::unsupported
```

## 4. Frontend Setup

Open PowerShell:

```powershell
cd "C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\frontend"
```

Use Node 16.20.2:

```powershell
nvm install 16.20.2
nvm use 16.20.2
node -v
```

Clean install:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
```

Run development server:

```powershell
npm start
```

Default frontend URL:

```text
http://localhost:4200/
```

## 5. Frontend Build

Production build:

```powershell
npm run build:ps
```

Manual equivalent:

```powershell
$env:NODE_OPTIONS='--openssl-legacy-provider --max_old_space_size=8192'
.\node_modules\.bin\ng.cmd build --prod --progress=false
```

The `--openssl-legacy-provider` flag is required when using newer Node versions with Webpack 4. The `--max_old_space_size=8192` value gives the Angular production optimizer enough memory for this large legacy application.

Build output:

```text
frontend/dist/
```

## 6. Backend Setup

Open PowerShell:

```powershell
cd "C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\backend"
```

Install dependencies:

```powershell
npm install
```

Start backend:

```powershell
npm start
```

Backend database connection file:

```text
backend/dbconnection.js
```

Configuration file:

```text
backend/config.json
```

## 7. Frontend Architecture

Main Angular source:

```text
frontend/src/app/
```

Important folders:

```text
components/      Shared layout components such as navbar/sidebar
models/          TypeScript model classes
modules/         Feature modules
services/        API service classes
```

Admin feature module:

```text
frontend/src/app/modules/admin/admin.module.ts
frontend/src/app/modules/admin/admin.routing.ts
```

The admin module declares most business screens and registers child routes.

Common admin screens include:

```text
Quotation
Requirement
Lead
SalesOrder
Price_Request
Price_Response
Performa_Invoice
Delivery_Order
invoice
Purchase_Order
purchase-return
Sales_Return
Stock
Stock_Report
OutstandingReport
StatementOfAccount
User_Details
User_Role
Company
Department
Designation
Vertical
```

## 8. Backend Architecture

Main backend routes:

```text
backend/routes/
```

Examples:

```text
Quotation-related:
salesquotationmaster.js
salesquotationdetails.js
quotation_delivery_order.js
quotation_performa.js
quotation_salesmaster.js
quotation_purchaseordermaster.js

Sales:
Sales_Master.js
Sales_Details.js
salesordermaster.js
salesorderdetails.js
Sales_Return_Master.js
Sales_Return_Details.js

Purchase:
Purchase_Master.js
Purchase_Details.js
purchaseordermaster.js
purchaseorderdetails.js
Purchase_Return_Master.js
purchase_return_details.js

Masters:
Company.js
Client_Accounts.js
Item.js
Item_Group.js
Brand.js
Department.js
Designation.js
User_Role.js
User_Type.js

Leads:
Lead.js
LeadRequirement.js
Vertical.js
Company_Size.js
Working_Status.js
```

Database scripts and migrations are stored in the backend root as `.sql` and helper `.js` files.

## 9. Important Recent Fixes

### Angular module error

Issue:

```text
Cannot determine the module for class User_RoleComponent in
src/app/modules/admin/User_Role/User_Role_Clean.component.ts
```

Root cause:

`User_Role_Clean.component.ts` was a stale duplicate component with the same class name and selector as the real `User_Role.component.ts`.

Fix:

The clean file was changed to a plain class:

```ts
export class User_RoleCleanComponent {
}
```

The real component remains declared in `AdminModule`:

```ts
import { User_RoleComponent } from './User_Role/User_Role.component';

declarations: [
  User_RoleComponent
]
```

### Price response template error

Issue:

```text
Property 'Price_Response_Details_Data1' does not exist on type 'Price_ResponseComponent'
```

Fix:

Changed the template reference to:

```html
Price_Response_Details_Data
```

### OpenSSL / Webpack build error

Issue:

```text
ERR_OSSL_EVP_UNSUPPORTED
```

Fix:

Use Node 16.20.2, or use:

```powershell
$env:NODE_OPTIONS='--openssl-legacy-provider --max_old_space_size=8192'
```

### Quotation dropdown UI

The customer autocomplete dropdown in the Quotation screen was restyled with a scoped panel class:

```html
class="quotation-autocomplete-panel"
```

CSS was added to improve spacing, hover state, width, shadow, border radius, and text overflow.

## 10. Package Scripts

Frontend scripts:

```json
"start": "ng serve",
"start:cmd": "set NODE_OPTIONS=--openssl-legacy-provider && ng serve",
"start:ps": "powershell -NoProfile -Command \"$env:NODE_OPTIONS='--openssl-legacy-provider'; ng serve\"",
"start:linux": "NODE_OPTIONS=--openssl-legacy-provider ng serve",
"build": "ng build --prod && gzipper --verbose ./dist",
"build:cmd": "set NODE_OPTIONS=--openssl-legacy-provider --max_old_space_size=8192 && ng build --prod && gzipper --verbose ./dist",
"build:ps": "powershell -NoProfile -Command \"$env:NODE_OPTIONS='--openssl-legacy-provider --max_old_space_size=8192'; ng build --prod; if ($LASTEXITCODE -eq 0) { gzipper --verbose ./dist }\"",
"build:linux": "NODE_OPTIONS=--openssl-legacy-provider --max_old_space_size=8192 ng build --prod && gzipper --verbose ./dist"
```

Backend scripts:

```json
"start": "nodemon ./bin/ubillmlm"
```

## 11. Common Troubleshooting

### `ERR_OSSL_EVP_UNSUPPORTED`

Cause:

Node version too new for Webpack 4.

Fix:

```powershell
nvm use 16.20.2
npm run build:ps
```

### JavaScript heap out of memory

Cause:

Angular production optimization needs more memory.

Fix:

```powershell
$env:NODE_OPTIONS='--openssl-legacy-provider --max_old_space_size=8192'
.\node_modules\.bin\ng.cmd build --prod --progress=false
```

### Angular component module error

Check:

1. The component has exactly one `@Component` class.
2. The class is declared in exactly one NgModule.
3. There are no backup files exporting duplicate component classes.
4. The import path in the module points to the intended file.

### Template property does not exist

Check:

1. The property exists in the `.component.ts` file.
2. The spelling exactly matches the HTML template.
3. Arrays used in `*ngFor` are initialized before use.

## 12. Verification Commands

Frontend TypeScript check:

```powershell
cd "C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\frontend"
.\node_modules\.bin\tsc.cmd -p tsconfig.app.json --noEmit --pretty false
```

Frontend production build:

```powershell
cd "C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\frontend"
npm run build:ps
```

Backend syntax check example:

```powershell
cd "C:\Users\nanda\OneDrive\Desktop\UFS PROJECT\netronics\backend"
node --check app.js
```

## 13. Deployment Notes

1. Build frontend using `npm run build:ps`.
2. Confirm files are generated under `frontend/dist/`.
3. Deploy the generated frontend files to the configured web server.
4. Ensure backend database configuration in `backend/config.json` and `backend/dbconnection.js` is correct.
5. Start backend with `npm start` or a production process manager.

## 14. Upgrade Recommendations

This project is legacy Angular 8. Directly upgrading Webpack alone is not recommended because Angular CLI controls Webpack internally.

Recommended upgrade path:

```text
Angular 8 -> Angular 9 -> Angular 10 -> Angular 11 -> Angular 12+
```

Webpack 5 should be introduced through Angular CLI upgrades, not by manually forcing Webpack 5 into the Angular 8 toolchain.

Short-term production recommendation:

```text
Keep Angular 8 and Webpack 4.
Use Node 16.20.2.
Use the existing build:ps script.
```

Long-term recommendation:

```text
Plan a staged Angular upgrade and remove legacy OpenSSL workarounds after moving to a modern Angular/Webpack toolchain.
```

# Brand Item Name Feature Update

## Overview
This update adds an "Item Name" field to the Brand form that saves both Brand and Item information together.

## Database Changes Required

### 1. Apply Database Schema Updates
Run the following command in the backend directory to update the database:

```bash
node apply_brand_item_update.js
```

This will:
- Add `Item_Id` and `Item_Name` columns to the Brand table
- Update the `Save_Brand` stored procedure to handle the new fields
- Update the `Search_Brand` stored procedure to return the new fields

### 2. Manual SQL (Alternative)
If the script doesn't work, run the SQL manually from `brand_item_db_update.sql`

## Frontend Changes Made

### 1. Brand Model (`Brand.ts`)
- Added `Item_Id: number`
- Added `Item_Name: string`

### 2. Brand Component (`Brand.component.html`)
- Added "Item Name" input field with validation
- Added "Item Name" column to the data table

### 3. Brand Component (`Brand.component.ts`)
- Added Item_Name validation in `Save_Brand()` function
- Added Item_Id and Item_Name initialization in `Clr_Brand()` function

## Backend Changes Made

### 1. Brand Model (`Brand.js`)
- Updated `Save_Brand` function to accept Item_Id and Item_Name parameters
- Updated stored procedure call to include new parameters

## How It Works

1. User enters both "Brand Name" and "Item Name" in the form
2. When "Save" is clicked, both fields are validated
3. Data is saved to database with:
   - Brand_Id (auto-generated or existing)
   - Brand_Name (user input)
   - Item_Id (auto-generated or existing)
   - Item_Name (user input)
4. The table displays both Brand Name and Item Name columns

## Testing

1. Navigate to the Brand page
2. Click "Create New"
3. Enter both Brand Name and Item Name
4. Click Save
5. Verify both fields appear in the table
6. Test editing existing records
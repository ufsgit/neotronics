# Implementation Plan: Lead-Requirement-Quotation Flow

## Information Gathered

### Current Architecture
- **Lead Module**: Full CRUD with follow-up drawer, staff mapping, dropdown loading. Has `Open_Requirement()` method that stores lead data in localStorage and navigates to `/Requirement`.
- **Requirement Module**: Has list view (search + table) and entry view (master + details grid). Already has auto-fill logic from Lead via `localStorage.getItem('Lead_For_Requirement')`.
- **Backend**: `Save_Lead` SP accepts `Contact_Number`. `Save_Requirement` SP handles master + details JSON.
- **Database**: Lead table has `Contact_Number` column. requirementmaster/requirementdetails tables exist.

### Current Gaps
1. Lead form has `Contact_Person` field but **no `Contact_Number` field** in the HTML.
2. Lead list page has **no "Requirement" button**.
3. Requirement list's `Create_New()` directly opens entry form — **no lead selection step**.
4. Lead form layout doesn't have Contact Person section on the **right side**.

---

## Plan

### Phase 1: Lead Form — Contact Person Section & Contact Number
**File**: `frontend/src/app/modules/admin/Lead/Lead.component.html`
- Reorganize the entry form layout: create a two-column structure.
- **Left column (col-md-8)**: Basic details (Lead Name, Phone, Source, Vertical, etc.).
- **Right column (col-md-4)**: Contact Person section with:
  - Contact Person input (existing)
  - **Contact Number input (NEW)**
  - Designation dropdown (moved here for grouping)
- Update list view scrollable columns to show **Contact Number**.

**File**: `frontend/src/app/modules/admin/Lead/Lead.component.ts`
- Ensure `Lead_.Contact_Number` is bound and saved.

**File**: `frontend/src/app/models/Lead.ts`
- Verify `Contact_Number` property exists (already present).

---

### Phase 2: Lead List — Add "Requirement" Button
**File**: `frontend/src/app/modules/admin/Lead/Lead.component.html`
- Add a "Requirement" button in the list view header (next to "New Lead").
- Add a "Requirement" action button on each lead row (in the Action column).

**File**: `frontend/src/app/modules/admin/Lead/Lead.component.ts`
- `Open_Requirement(lead)` already exists and stores lead JSON to localStorage + navigates to `/Requirement`.
- Link the new buttons to this method.

---

### Phase 3: Requirement List — Lead Selection Flow
**File**: `frontend/src/app/modules/admin/Requirement/Requirement.component.ts`
- Modify `Create_New()`:
  - Instead of directly setting `Entry_View = true`, set a new flag `Lead_Select_View = true`.
  - This shows a lead selection panel in the list view.
- Add `Lead_Select_View` boolean flag.
- Add `Lead_Search_Data` array and `Selected_Lead` object.
- Add `Search_Lead_Typeahead(event)` method to call Lead API for autocomplete.
- Add `Select_Lead_For_Requirement(lead)` method:
  - Fetches lead details (or uses cached data).
  - Displays Person Details (Lead Name, Contact Person, Contact Number, Phone, Email, Address).
  - Sets `Show_Lead_Details = true`.
- Add `Proceed_To_Requirement()` method:
  - Stores selected lead data to localStorage as `Lead_For_Requirement`.
  - Sets `Lead_Select_View = false`, `Show_Lead_Details = false`, `Entry_View = true`.
  - Triggers existing auto-fill logic.

**File**: `frontend/src/app/modules/admin/Requirement/Requirement.component.html`
- In the list view (`*ngIf="!Entry_View"`), add a new section:
  - **Lead Selection Panel** (shown when `Lead_Select_View`):
    - Search input with autocomplete for Lead Name.
    - **Person Details Card** (shown when `Show_Lead_Details`):
      - Lead Name, Contact Person, Contact Number, Phone, Email, Address.
    - **"Add Requirement" button** — calls `Proceed_To_Requirement()`.
  - Hide the regular search filters when `Lead_Select_View` is active, or keep them and add the lead search as a modal-like overlay.

---

### Phase 4: Requirement Entry — Auto-fill from Selected Lead
**File**: `frontend/src/app/modules/admin/Requirement/Requirement.component.ts`
- The existing `ngOnInit` auto-fill logic already handles `Lead_For_Requirement` from localStorage.
- Ensure it maps:
  - `Lead_Name` → `Customer_Name`
  - `Contact_Person` → `KindAttend`
  - `Phone` → `Supplier_Ref_No` (already done)
  - `Contact_Number` → `Mobile_No` (already partially done)
  - `Email` → (add if field exists)
  - `Address` → Delivery Address (optional enhancement)

---

### Phase 5: Backend Verification
**File**: `backend/routes/Lead.js`
- Verify `Get_Leads` returns `Contact_Number` (SP should already return it if column exists).

**File**: `backend/models/Lead.js`
- Already accepts `Contact_Number` in `Save_Lead`.

---

## Dependent Files to Edit

| # | File | Change |
|---|------|--------|
| 1 | `frontend/src/app/modules/admin/Lead/Lead.component.html` | Add Contact Number field, reorganize layout, add Requirement button |
| 2 | `frontend/src/app/modules/admin/Lead/Lead.component.ts` | Bind Contact_Number, link Requirement button |
| 3 | `frontend/src/app/modules/admin/Requirement/Requirement.component.html` | Add lead selection panel + person details + Add Requirement button |
| 4 | `frontend/src/app/modules/admin/Requirement/Requirement.component.ts` | Lead selection flow, auto-fill logic enhancement |
| 5 | `frontend/src/app/models/Lead.ts` | Verify Contact_Number (no change likely needed) |

## Follow-up Steps
1. Run `ng build` to verify Angular compilation.
2. Test the full flow: Lead → Requirement button → Quotation list → + → Select Lead → Person Details → Add Requirement → Transaction page with auto-fill.
3. Verify Requirement Master + Details save correctly.

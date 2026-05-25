import os, re

def main():
    with open('Purchase_order.component.html', 'r', encoding='utf-8') as f:
        po_html = f.read()
    with open('../Invoice/invoice.component.html', 'r', encoding='utf-8') as f:
        inv_html = f.read()

    # Find boundaries in PO
    po_start_str = '<div class="row" *ngIf="Entry_View"'
    po_end_str = '<div class="container-fluid mt-3" *ngIf="performaPendingView"'
    
    po_start = po_html.find(po_start_str)
    po_end = po_html.find(po_end_str)
        
    if po_start == -1 or po_end == -1:
        print("PO boundaries not found:", po_start, po_end)
        return

    # Find boundaries in Invoice
    inv_start = inv_html.find(po_start_str)
    inv_end = inv_html.find('<div id="Print_Div"')
        
    if inv_start == -1 or inv_end == -1:
        print("Invoice boundaries not found:", inv_start, inv_end)
        return

    entry_view = inv_html[inv_start:inv_end]
    # Strip any trailing HTML comment start or whitespace to prevent leaks
    entry_view = entry_view.rstrip()
    if entry_view.endswith('<!--'):
        entry_view = entry_view[:-4].rstrip()

    # Replace master and details bindings
    entry_view = entry_view.replace('Sales_Master_', 'Purchase_Ordermaster_')
    entry_view = entry_view.replace('Sales_Details_', 'Purchase_Orderdetails_')
    entry_view = entry_view.replace('Sales_Details_Data', 'Purchase_Orderdetails_Data')
    entry_view = entry_view.replace('Sales_Details_New', 'Purchase_Orderdetails_New')
    
    # Replace labels and models
    entry_view = entry_view.replace('Customer <span', 'Supplier <span')
    
    entry_view = entry_view.replace('Sales Invoice No</label>', 'Order Number</label>')
    entry_view = entry_view.replace('[(ngModel)]="Purchase_Ordermaster_.Invoice_No"', '[(ngModel)]="Purchase_Ordermaster_.OrderNumber"')
    
    # Functions
    entry_view = entry_view.replace('Calculate_Total_Amount()', 'Calculate_Quotation_Details_Amount()')
    entry_view = entry_view.replace('Save_Sales(0)', 'Save_purchase_order(0)')
    entry_view = entry_view.replace('Delete_Sales_Detail', 'Delete_Quotation_Detail')
    entry_view = entry_view.replace('Edit_Sales_Detail', 'Edit_Quotation_Detail')
    entry_view = entry_view.replace('Plus_Sales_Details', 'Plus_Sales_Details')
    entry_view = entry_view.replace('Stock_', 'Item_') 
    entry_view = entry_view.replace('Search_Item_Typeahead', 'Search_PurchaseItem_Typeahead')
    entry_view = entry_view.replace('(ngModelChange)="supplyDateChange();DueDateChange()"', '')
    entry_view = entry_view.replace('(click)="supplyDateChange();DueDateChange()"', '')
    
    # Let's write the new file out
    new_po_html = po_html[:po_start] + entry_view + po_html[po_end:]
    
    with open('Purchase_order.component.html', 'w', encoding='utf-8') as f:
        f.write(new_po_html)
        
    print("Successfully generated Purchase_order.component.html")
    
if __name__ == '__main__':
    main()

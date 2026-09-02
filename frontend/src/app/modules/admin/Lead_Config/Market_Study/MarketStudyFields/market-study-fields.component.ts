import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-study-fields',
  templateUrl: './market-study-fields.component.html',
  styleUrls: ['./market-study-fields.component.css']
})
export class MarketStudyFieldsComponent implements OnInit {
  categoryId: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      console.log('Loaded Fields for Category ID:', this.categoryId);
      // Logic for loading fields will be implemented in the next step
    });
  }
}

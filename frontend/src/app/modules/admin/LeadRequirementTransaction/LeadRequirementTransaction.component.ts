import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadRequirementService } from '../../../services/LeadRequirement.Service';

@Component({
  selector: 'app-LeadRequirementTransaction',
  templateUrl: './LeadRequirementTransaction.component.html',
  styleUrls: ['./LeadRequirementTransaction.component.css']
})
export class LeadRequirementTransactionComponent implements OnInit {
  issLoading = false;
  Master: any = null;
  Details: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private leadRequirementService: LeadRequirementService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    if (!id) {
      this.router.navigateByUrl('/LeadRequirement');
      return;
    }
    this.load(id);
  }

  load(id: number) {
    this.issLoading = true;
    this.leadRequirementService.Get(id).subscribe(rows => {
      this.Master = rows && rows[0] && rows[0][0] ? rows[0][0] : (rows && rows.Master ? rows.Master : null);
      this.Details = rows && rows[1] ? rows[1] : (rows && rows.Details ? rows.Details : []);
      this.issLoading = false;
    }, _err => {
      this.Master = null;
      this.Details = [];
      this.issLoading = false;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const GetInvitations = gql`
  query GetInvitations{
  invitations {
    _id
    email
  }
}
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {
  invitations: any[];
  loading = true;
  error: any;
  


  constructor(private apollo: Apollo) {}


  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GetInvitations
      })
      .valueChanges.subscribe(result => {
        this.invitations = result.data && result.data.invitations;
        this.loading = result.loading;
        this.error = result.invitations;
      });
  }
}

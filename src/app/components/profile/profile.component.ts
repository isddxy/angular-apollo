import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const GetUser = gql`
  query GetUser {
    user(username: "admin") {
      _id
      username
      email
      firstName
      lastName
      createdAt
      enabled
      permissions
    }
  }

`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading: boolean;
  user: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GetUser
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.user = data.user;
        console.log(this.user);
      });
  }

  getProfile() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GetUser
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.user = data.user;
        console.log(this.user);
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}

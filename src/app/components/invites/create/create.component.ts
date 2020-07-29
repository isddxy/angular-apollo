import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const CreateInvite = gql`
  mutation CreateInvite($CreateInviteInput: CreateInviteInput){
  createInvite(createInviteInput: $CreateInviteInput) {
    _id
    email
  }
}
`;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.styl']
})
export class CreateComponent implements OnInit {
  email: string;
  createInviteInput: {
    email: "asdasda-test@mail.com"
  }


  constructor(private apollo: Apollo) {}

  addEmail(email: string) {
    if (email) {
      this.email = email;
    }
  }

  ngOnInit() {
  }


  SendInvite() {
    if (this.email) {
      this.apollo.mutate({
        mutation: CreateInvite,
        variables: {
          CreateInviteInput: {
            email: this.email
          }
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);
      },(error) => {
        console.log('there was an error sending the query', error);
      });
    } else {
      console.log('Импут пустой')
    }
  }
}

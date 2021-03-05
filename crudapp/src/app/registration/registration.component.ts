import { Component, OnInit } from '@angular/core';
import { ResgisterationService } from './resgisteration.service';
import { Users } from "./users";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ResgisterationService]
})
export class RegistrationComponent implements OnInit {

  users: Users[] = [];
  selectedUser: Users;

  ngForm = this.fb.group({
    "_id": [""],
    "fname": ["", Validators.required],
    "lname": ["", Validators.required],
    "department": ["", Validators.required],
    "contact_no": ["", Validators.required],
    "email": ["", Validators.required]
  })

  constructor(private fb: FormBuilder, private registerService: ResgisterationService) { }



  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.registerService.getallUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    }, err => {
      console.log(err);
    })
  }

  onSubmit(users: Users) {
    console.log(users);
    if (!users._id) {
      this.registerService.onRegister(users).subscribe(res => {
        console.log(res);
        this.ngOnChanges();
        alert("User Registered Successfuly");
        this.ngForm.reset();
      }, err => {

      })
    }
    else {
      this.registerService.updatUser(users).subscribe(res => {
        console.log(res);
        this.ngOnChanges();
        alert("User Data Updated Successfuly");
        this.ngForm.reset();
      }, err => {

      })
    }
  }

  onEdit(_id: string, user: Users) {
    console.log(_id);
    this.selectedUser = user;

    let newUser: Users = {
      _id: this.selectedUser._id,
      fname: this.selectedUser.fname,
      lname: this.selectedUser.lname,
      department: this.selectedUser.department,
      contact_no: this.selectedUser.contact_no,
      email: this.selectedUser.email
    }
    this.registerService.getUser(_id).subscribe(res => {
      console.log(res);

      this.ngForm.patchValue(newUser);
    }, err => {

    }
    )
  }

  onDelete(_id: string) {
    console.log(_id);
    this.registerService.deleteId(_id).subscribe(res => {
      console.log(res);
      this.ngOnChanges();
      alert("User Deleted Successfuly");
    }, err => {

    })
  }



}

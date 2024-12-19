import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { AlertService } from 'src/services/alert.service';
import { ModalService } from 'src/services/modal.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users-upsert',
  templateUrl: './users-upsert.component.html',
  styleUrls: ['./users-upsert.component.scss']
})
export class UsersUpsertComponent implements OnInit {
  @Input() user?: any;
  userForm!: FormGroup;
  genders = ['male', 'female'];

  constructor(
    public modalService: ModalService,
    public usersService: UsersService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      father_name: new FormControl(this.user?.father_name, [Validators.required]),
      grandfather_name: new FormControl(this.user?.grandfather_name, [Validators.required]),
      family_branch_name: new FormControl(this.user?.family_branch_name, [Validators.required]),
      gender: new FormControl(this.user?.gender, [Validators.required]),
      phone: new FormControl(this.user?.phone, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user?.password, [Validators.required]),
      password_confirmation: new FormControl(this.user?.password_confirmation, [Validators.required]),
      date_of_birth: new FormControl(this.user?.date_of_birth, [Validators.required]),
      country_id: new FormControl(this.user?.country_id, [Validators.required]),
      phone_code: new FormControl(this.user?.phone_code, [Validators.required]),
      country_code: new FormControl(this.user?.country_code, [Validators.required]),
      tribe: new FormControl(this.user?.tribe, [Validators.required]),
      active: new FormControl(this.user?.active == "True" || this.user?.active == 1 ? true : false),
      is_premium: new FormControl(this.user?.is_premium == "True" || this.user?.is_premium == 1 ? true : false)
    });

    if(this.user) {
      this.userForm.controls["password"].disable();
      this.userForm.controls["password_confirmation"].disable();
    }
  }

  onSubmit() {
  }
}

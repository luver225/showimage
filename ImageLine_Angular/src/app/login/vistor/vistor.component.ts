import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from 'src/app/shared/service';
import { Router } from '@angular/router';
import { LienceDto } from 'src/app/shared/dto';

@Component({
  selector: 'app-vistor',
  templateUrl: './vistor.component.html',
  styleUrls: ['./vistor.component.css']
})
export class VistorComponent implements OnInit {

  form: FormGroup;
  needVisibility: boolean;
  loginResult:string;

  constructor(private fb: FormBuilder,
    private service: Service,
    private route: Router,) {
    this.form = fb.group({
      userName: [null,],
      password: [null,],
    });

  }

  ngOnInit(): void {
  }

  
  vistor()
  { 

  }

}

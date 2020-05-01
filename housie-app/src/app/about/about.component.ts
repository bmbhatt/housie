import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  link: string = "https://meetingsamer4.webex.com/meetingsamer4/j.php?MTID=mb41b0fdece55cd4c4c59025d919aea18";

  constructor() { }

  ngOnInit(): void {
  }

}

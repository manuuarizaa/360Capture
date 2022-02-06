import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() icon: string = "caret-back-outline";
  @Input() backButton: boolean = false;
  @Input() backText: string = "";
  @Input() backRoute: string = "";
  @Input() title: string = "";
  
  constructor() { }

  ngOnInit() {}

}

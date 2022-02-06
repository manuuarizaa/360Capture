import { Component, OnInit } from '@angular/core';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {

  constructor(
    private openNative: OpenNativeSettings
  ) { }

  ngOnInit() {}

  async givePermissions(){
    this.openNative.open("application_details");
  }

}

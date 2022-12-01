import { Component, Input } from '@angular/core';

@Component({
  selector: 'fmc-announcement',
  templateUrl: 'announcement.html'
})
export class FmcAnnouncement {
  @Input('icon-color')
  public iconColor: string;

  @Input('icon-name')
  public iconName: string;

  @Input()
  public text: string;

  constructor() {}
}
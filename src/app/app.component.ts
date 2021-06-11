import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practical-exam';
  totalData = [];
  jsonData = [];
  idList = [];
  constructor(private appService: AppService) {
  }

  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  selected: { startDate: moment.Moment, endDate: moment.Moment };
  ngOnInit() {
    this.jsonData = [];
    this.appService.getJsonData().subscribe((data) => {
      this.jsonData = data;
      this.idList = [];
      data.forEach(element => {
        if (this.idList.indexOf(element.websiteId) == -1) {
          this.idList.push(element.websiteId);
        }
      });
      // console.log('data', id)
      this.totalData = [];
      for (const ids of this.idList) {
        let missedChat = 0;
        let totalChat = 0;
        data.map(item => {
          if (item.websiteId == ids) {
            missedChat = missedChat + item.missedChats;
            totalChat = totalChat + item.chats;
          }
        });
        this.totalData.push({ websiteId: ids, chats: totalChat, missedChats: missedChat, })
      }

    });
  }
  open() {

    let start_date = new Date(this.selected.startDate['_d']);
    let end_date = new Date(this.selected.endDate['_d']);
    let startDate = moment(start_date).format('YYYY-MM-DD');
    let endDate = moment(end_date).format('YYYY-MM-DD');
    let x = 0;
    this.totalData = [];
    this.jsonData.forEach((item) => {
      let itemDate = new Date(item.date)
      if (moment(itemDate).format('YYYY-MM-DD') >= startDate && moment(itemDate).format('YYYY-MM-DD') <= endDate) {
        // x++;
        for (const ids of this.idList) {
          let missedChat = 0;
          let totalChat = 0;
          // data.map(item => {
          if (item.websiteId == ids) {
            missedChat = missedChat + item.missedChats;
            totalChat = totalChat + item.chats;
          }
          if (this.totalData.indexOf(item.websiteId) == -1) {
            this.totalData.push({ websiteId: item.websiteId, chats: totalChat, missedChats: missedChat });
          }
        }
        // this.totalData.push(item)
        // startDate = moment(itemDate).format('YYYY-MM-DD');
      }
    });
  }

}

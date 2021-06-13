import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sheets = [];
  sheetChecked = [];
  sheetJsonData = [];
  isUploaded = false;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  inputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    let workBook = null;
    let jsonData = null;
    this.isUploaded = true;
    const reader = new FileReader();
    const file = fileInputEvent.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        this.sheets.push(name);
        this.sheetChecked.push(false);
        function format_column_name(name) { return name.toLowerCase().replace(/\s/g, "_"); }
        var range = XLSX.utils.decode_range(sheet['!ref']);
        var headers = [];
        console.log(range)
        for (var C = range.s.c; C <= range.e.c; ++C) {
          var addr = XLSX.utils.encode_cell({ r: range.s.r, c: C });
          var cell = sheet[addr];
          if (!cell) continue;
          console.log(cell.v)
          headers.push(format_column_name(cell.v));
        }
        initial[name] = XLSX.utils.sheet_to_json(sheet, { header: headers, range: 1 });
        return initial;
      }, {});
      // const dataString = JSON.stringify(jsonData);
      this.sheetJsonData.push(jsonData);
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }

  upload() {
    console.log(this.sheetJsonData)
    this.sheetChecked.forEach((v, i) => {
      if (v) this.dashboardService.createTable(this.sheets[i], this.sheetJsonData[0][this.sheets[i]])
    })
  }

  getTable() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "DragonsGymAdmin",
      Subject: "Test",
      Author: "Nazrul",
      CreatedDate: new Date()
    };
    let indexCount=-1;
    const tableName = ['Subscription', 'resources'];
    tableName.forEach((o, index) => this.dashboardService.getTable(o).subscribe(
      data => {
        let jsonarray = [];
        for (let i = 0; i < Object.keys(data["out"][0]).length-3; i++) {
          
          jsonarray.push(data["out"][0][i]);
        }
        
        var ws = XLSX.utils.json_to_sheet(jsonarray);
        XLSX.utils.book_append_sheet(wb, ws, o);
        indexCount++;
        if (index ==indexCount && index == tableName.length-1) {
          XLSX.writeFile(wb, 'DragonsGymAdmin.xlsx');
        }

      },
      err => {

      }
    ))


  }
  s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }
}

import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { ApiService } from 'src/app/service/api.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-booking-mgmt',
  templateUrl: './booking-mgmt.component.html',
  styleUrls: ['./booking-mgmt.component.css']
})
export class BookingMgmtComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr_no', 'booking_date_time', 'amount', 'driver','driver_mobile','user','user_mobile', 'status' ];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild("MatPaginator") MatPaginator!: MatPaginator;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  bookingData: any;
  constructor(public dialog :MatDialog, private api : ApiService) { }

  ngOnInit(): void {
    this.getBookingData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBookingData() {
    this.api.get("list/booking").subscribe({
      next: (res: any) => {
        this.bookingData = res.data.result.rows;
        this.dataSource = new MatTableDataSource(this.bookingData);
        this.dataSource.paginator = this.MatPaginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

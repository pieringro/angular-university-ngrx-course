import { Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from "rxjs";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectBeginnerCourses, selectAdvanceCourses, selectPromoTotal } from '../courses.selectors';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;

  loading$: Observable<boolean>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.reload();
  }

  reload() {


    this.beginnerCourses$ = this.store.pipe(
      select(selectBeginnerCourses),
      tap(whatever => console.log(whatever)),
    )

    this.advancedCourses$ = this.store.pipe(
      select(selectAdvanceCourses),
      tap(whatever => console.log(whatever)),
    );

    this.promoTotal$ = this.store.pipe(
      select(selectPromoTotal),
      tap(whatever => console.log(whatever)),
    );

    // const courses$ = this.coursesHttpService.findAllCourses()
    //   .pipe(
    //     map(courses => courses.sort(compareCourses)),
    //     shareReplay()
    //   );

    // this.loading$ = courses$.pipe(map(courses => !!courses));

    // this.beginnerCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'BEGINNER'))
    //   );


    // this.advancedCourses$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category == 'ADVANCED'))
    //   );

    // this.promoTotal$ = courses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.promo).length)
    //   );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}

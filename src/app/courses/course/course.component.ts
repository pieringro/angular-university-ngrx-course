import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { LessonEntityService } from '../services/lesson-entity.service';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  noMoreLesson = false;

  constructor(
    private coursesService: CourseEntityService,
    private lessonService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.find(course => course.url == courseUrl)),
      );

    this.lessons$ = this.lessonService.entities$
      .pipe(
        withLatestFrom(this.course$), //mix the result of the course& observable
        tap(([lessons, course]) => { //side effect, load page from the backend
          if (this.nextPage == 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) =>
          lessons.filter(lesson => lesson.courseId == course.id))
      );

    // without delay it causes a ExpressionChangedAfterItHasBeenCheckedError error
    this.loading$ = this.lessonService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    if (!this.noMoreLesson) {
      this.lessonService.getWithQuery({
        'courseId': course.id.toString(),
        'sortOrder': 'asc',
        'pageNumber': this.nextPage.toString(),
        'pageSize': '3',
      }).subscribe(lesson => {
        if (lesson.length == 0) {
          this.noMoreLesson = true;
        }
      });

      this.nextPage++;
    }
  }

}

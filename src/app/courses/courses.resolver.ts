
import { Injectable, } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "app/reducers";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.action";
import { areCourseLoaded as areCoursesLoaded } from "./courses.selectors";


// router service: it runs before the router complete its transition
@Injectable()
export class CoursesResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(areCoursesLoaded),
                tap(coursesLoaded => {
                    // without the flag loading, store.dispatch will be called twice due to router multiple actions dispatched
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(), //to complete the observable
                finalize(() => this.loading = false) //once is complete
            );
    }


}
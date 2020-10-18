
import { Injectable, } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "app/reducers";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.action";


// router service: it runs before the router complete its transition
@Injectable()
export class CoursesResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                tap(() => {
                    if (!this.loading) { // without the flag, store.dispatch will be called twice due to router multiple actions dispatched
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                first(), //to complete the observable
                finalize(() => this.loading = false) //once is complete
            );
    }


}

import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

export const loadAllCourses = createAction(
    "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
    "[Load Courses Effect] All Courses Loaded",
    props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
    "[Edit Course Dialog] Course Updated",
    // Update is a special type, that makes easy to modify data stored in Entity format
    props<{update: Update<Course>}>() 
);



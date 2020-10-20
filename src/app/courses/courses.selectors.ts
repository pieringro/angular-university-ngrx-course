import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CoursesState } from './reducers/course.reducers';
import * as fromCourses from './reducers/course.reducers';

// selectors are essentialy queries that we are issuing against the store

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvanceCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const areCourseLoaded = createSelector(
    selectCoursesState,
    courses => courses.allCoursesLoaded
);


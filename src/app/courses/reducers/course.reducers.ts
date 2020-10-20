import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createReducer,
    createSelector,
    MetaReducer,
    on
} from '@ngrx/store';
import { CourseActions } from "../action-types";

export interface CoursesState extends EntityState<Course> {

    // entity format (from interface EntityState extended)
    // entities: { [key: number]: Course },
    // ids: number[],

}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: course => course.id //select the field that is the id (if is not id)
});

export const initialCoursesState = adapter.getInitialState();


export const coursesReducer = createReducer(
    initialCoursesState,

    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(action.courses, state))
);

export const {
    selectAll
} = adapter.getSelectors();




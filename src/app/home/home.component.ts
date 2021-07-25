import {Component, OnInit} from '@angular/core';
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import { Course } from '../model/course';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {
    }

    ngOnInit() {
        const http$ = createHttpObservable('http://localhost:4201/api/courses');

        const courses$ = http$.pipe(
            tap(() => console.log("HTTP request executed")),
            map(res => Object.values(res["payload"]) as Course[]),
            shareReplay()
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );
    }
}

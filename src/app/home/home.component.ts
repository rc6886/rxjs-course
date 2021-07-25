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
    beginnerCourses: Course[];
    advancedCourses: Course[];

    constructor() {
    }

    ngOnInit() {
        const http$ = createHttpObservable('http://localhost:4201/api/courses');
        const courses$ = http$.pipe(
            map(res => Object.values(res["payload"]) as Course[])
        );

        courses$.subscribe(
            courses => {
                this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
                this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
            },
            noop,
            () => console.log('completed'));
    }
}

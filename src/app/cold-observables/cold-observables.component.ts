import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription: Subscription;
  subscription2: Subscription;

  n1: number = 0;
  n2: number = 0;
  s1: string = "";
  s2: string = "";

  constructor() { }

  ngOnInit() {

    const myFirstObersable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error("6");
        observer.complete();
      }
    );

    myFirstObersable.subscribe((n: number) => {
      console.log("number", n)
    },
      (error) => console.log(error),
      () => console.log("completed")
    );

    // const timerCount = interval(500);
    // timerCount.subscribe(
    //   (n) => console.log(n)
    // );
    // console.log("after interval");

    // const myIntervalObservable = new Observable(
    //   (observer: Observer<any>) =>{
    //     observer.next(this.getCurrentName())
    //     observer.next(this.getCurrentTelefone());
    //   }
    // )

    // myIntervalObservable.subscribe(
    //   (info : any) => {console.log("info", info)},
    //   (error : any) => {console.log("error", error)},
    //   () => console.log("completed")
    // )
    this.s1 = "initializng ..."
    this.s2 = "initializng ..."

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i: number = 0;
        let id = setInterval(() => {
          i++;
          console.log("from observable", i);
          if (i == 10) {
            observer.complete();
          } else if (i % 2 == 0) {
            observer.next(i);
          }
        }, 1000);
        return () => {
          clearInterval(id)
        }
      }
    )

    this.subscription = myIntervalObservable.subscribe(
      (n) => { this.n1 = n },
      (error) => { this.s1 = "Error: " + error },
      () => { this.s1 = "completed." }
    )

      setInterval(() =>{
        
      }, 3000)

    this.subscription2 = myIntervalObservable.subscribe(
      (n) => { this.n2 = n },
      (error) => { this.s2 = "Error: " + error },
      () => { this.s2 = "completed." }
    );

    setTimeout(() => {
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000);


  }


  getCurrentName(): string {
    return "Leandro Souza";
  }


  getCurrentTelefone(): number {
    return 119676653178;
  }

}

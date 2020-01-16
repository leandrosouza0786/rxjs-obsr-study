import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {

  @ViewChild('myButton', null) button: ElementRef;

  n1: number = 0;
  n2: number = 0;
  s1: string = "";
  s2: string = "";

  constructor() { }

  ngOnInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(this.button.nativeElement, 'click');
    myBtnClickObservable.subscribe((event) => { console.log("btn clicado 1") });
    myBtnClickObservable.subscribe((event) => { console.log("btn clicado 2") });

    class Producer {
      private myListeners = [];
      private n = 0;
      private id;

      addListener(l) {
        this.myListeners.push(l);
      }

      start() {
        this.id = setInterval(() =>{
          this.n++;
          console.log("From Producer: " + this.n);
          for(let l of this.myListeners)
            l(this.n)
        }, 1000)
      }
      stop(){
        clearInterval(this.id);
      }
    }

    let producer : Producer = new Producer();
    producer.start();
    setTimeout(
     () => {
      producer.addListener(n => {
        console.log("from listenerr 1", n)
      })
      producer.addListener(n => {
        console.log("from listenerr 2", n)
      })
     }, 4000 
    );

    const myHotObservable = new Observable(
      (observer : Observer<number>) => {
        producer.addListener((n) => observer.next(n));
      }
    )

    myHotObservable.subscribe(n => {
      console.log("from subscriber 2", n)
    })

    myHotObservable.subscribe(n => {
      console.log("from subscriber 1", n)
    })
    

  }

}

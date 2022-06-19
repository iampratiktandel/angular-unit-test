import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

xdescribe('Angular Testing Examples', () => {

  it('Async test with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000)
  })

  it('Async test with setTimeout', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('Async test - plain Promise', fakeAsync(() => {
    let test = false;

    Promise.resolve().then(() => {
      test = true;
      return Promise.resolve();
    })
      .then(() => {
        console.log('ad');
      });
    
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Async test - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
    .then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    
    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(11);

  }))

  it('Async test example - Observables', fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    })

    tick(1000);
    expect(test).toBeTruthy();
  }));
})
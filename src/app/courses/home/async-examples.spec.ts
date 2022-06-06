import { fakeAsync, flush, tick } from "@angular/core/testing";

fdescribe('Angular Testing Examples', () => {

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
})
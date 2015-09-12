/**
 * @description an abstraction over rxjs, in the (somewhat naive) hope
 * of being able to reduce the coupling with rxjs.
 */
declare module Observables {
  export interface Selector<I,O> {
    (value: I, index?: number, observable?: Observable<I>): O;
  }

  export type Predicate<I> = Selector<I,boolean>;

  export interface Filter<I> {
    (predicate: Predicate<I>): Observable<I>;
  }

  export interface Reducer<I,O> {
    (accumulator: O, value: I): O;
  }

  export interface Observable<I> {
    filter: Filter<I>;
    takeWhile: Filter<I>;
    map<O>(selector: Selector<I,O>): Observable<O>;
    scan<O>(reducer: Reducer<I,O>, seed?: O): Observable<O>;
    flatMap<O>(mapper: Selector<I,Observable<O>>): Observable<O>;
    groupByUntil<O,K,T>(keySelector: Selector<I,K>,
                      mapper: Selector<I,O>,
                      trigger: Selector<Observable<O>,Observable<T>>):
      Observable<Observable<O>>;
  }

  export interface Static {
    observableFrom<T>(arr: Array<T>): Observable<T>;
  }
}

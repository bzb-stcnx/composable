"use strict";
var Rx;

/**
 * @description library of utility functions for jasmine tests of RXJS code
 */
module.exports = function(deps) {
  Rx = deps.Rx;
  return {
    ReactiveTest: {
      feed: feed,
      timeOf: timeOf
    },
    Scheduler: {
      startGroup: startGroup,
      equalMessages: equalMessages
    }
  };
};

/**
 * @param {object} timing not mutated.
 *   @property {number} subscribed default=Rx.ReactiveTest.subscribed
 *   @property {number} delay timing between onNext emissions
 * @param {array<any>} values the suite of values to time into the feed.
 * each array entry corresponds to a time step defined by timing.delay.
 * each of these array entries themselves include an array, the entries of which
 * are fed as individual notifications at the same time step.
 * if the latter array does not contain any values, the corresponding time step
 * is skipped (no notifications).
 * not mutated.
 * @return {array<Recorded>} the resulting feed
 */
function feed(timing, values) {
  var length = values.length;
  values = values.map(function(val, index) {
    return val.map(function(val) {
      return Rx.ReactiveTest.onNext(timeOf(index, timing), val);
    });
  }).filter(function(val) { return !!val; }); // ignore empty
  values = Array.prototype.concat.apply([], values); // flatmap
  values.push(Rx.ReactiveTest.onCompleted(timeOf(length, timing)));
  return values;
}

/**
 * @param {number} index
 * @param {object} timing
 *  @property {number} subscribed default=Rx.ReactiveTest.subscribed
 *  @property {number} delay
 * @return {number} timing of given index
 */
function timeOf(index, timing) {
  return subscribed(timing) + (1 + index) * timing.delay;
}

/**
 * Starts the test scheduler and uses the specified virtual times
 * to invoke the factory function, subscribe to the resulting sequence,
 * and dispose the subscription.
 *
 * @param {function} create factory to create an observable sequence.
 * @param {Array<any>} args arguments for the factory.
 * @param {Scheduler} scheduler
 * @param {number} created time at which to invoke the factory.
 * @param {number} subscribed time at which to subscribe
 * to the created observable sequence.
 * @param {number} disposed time at which to dispose the subscription.
 * @return {object}
 *  @property source Observable
 *  @property subscriptions Object
 *    @property root Subscription
 *    @property children Object group key to Subscription map
 *  @property observers Object
 *    @property root Observer with timestamped recordings
 *    of notification messages that were received during the virtual time window
 *    when the subscription to the source sequence was active.
 *    @property children Object group key to Observer map
 */
function startGroup(create, args, scheduler, created, subscribed, disposed) {
  var state = {
    observers: {
      children: []
    },
    subscriptions: {
      children: []
    }
  };

  state.observers.root = scheduler.createObserver();

  function observerWith(state) {
    return function(observable) {
      var observer = scheduler.createObserver();
      state.observers.children.push(observer);
      state.subscriptions.children.push(observable.subscribe(observer));
    };
  }

  scheduler.scheduleAbsoluteWithState(state,
    created,
    function (scheduler, state) {
      state.source = create.apply(null, args);
      return state.source;
    });

  scheduler.scheduleAbsoluteWithState(state,
    subscribed,
    function (scheduler, state) {
      state.subscriptions.root = state.source.subscribe(observerWith(state));
      return state.subscriptions.root;
    });

  scheduler.scheduleAbsoluteWithState(state,
    disposed,
    function (scheduler, state) {
      state.subscriptions.root.dispose();
      state.subscriptions.children.forEach(function(subscription) {
        subscription.dispose();
      });
    });

  scheduler.start();

  return state;
}

/**
 * @param {Array<Rx.Recorded>} expected
 * @param {Array<Rx.Recorded>} actual
 * @return {boolean} true if all recorded notifications are equal
 */
function equalMessages(expected, actual) {
  if (expected.length !== actual.length) return false;
  return expected.every(function(message, index) {
    return message.equals(message, actual[index]);
  });
}

/**
 * @param {object} timing not mutated
 *   @property {number} subscribed default=Rx.ReactiveTest.subscribed
 * @return {number} the subscribed property in given timing if defined,
 * otherwise Rx.ReactiveTest.subscribed
 */
function subscribed(timing) {
  return timing.subscribed || Rx.ReactiveTest.subscribed;
}

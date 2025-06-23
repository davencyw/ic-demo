use ic_cdk::{query, update};
use std::cell::RefCell;

#[derive(Default)]
struct State {
    /// A simple value to store and manipulate
    value: i64,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

#[query]
fn get_value() -> i64 {
    STATE.with(|state| state.borrow().value)
}

#[update]
fn increment() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.value += 1;
    });
}

#[update]
fn decrement() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.value -= 1;
    });
}

#[query]
fn say_hi(name: String) -> String {
    format!("hi {}", name)
}

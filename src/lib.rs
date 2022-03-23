use js_sys::Promise;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(module = "/js/bindings.js")]
extern "C" {
    async fn initialize() -> JsValue;
    fn encrypt(text: String);
}

#[wasm_bindgen]
pub fn enc(text: String) {
    encrypt(text);
}

#[wasm_bindgen]
pub async fn init() {
    let result = initialize().await;
}

// This is like the `main` function, except for JavaScript.
/* #[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Your code goes here!
    console::log_1(&JsValue::from_str("Hello world!"));

    Ok(())
} */

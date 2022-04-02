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
    async fn rust_initialize() -> JsValue;
    fn rust_set_encryption_scheme(scheme: String) -> JsValue;
    fn rust_setup_context(
        poly_modulus_degree: i32,
        bit_sizes: Vec<i32>,
        bit_size: i32,
        security_level: String,
    ) -> JsValue;
    fn rust_encrypt();
}

#[wasm_bindgen]
pub async fn initialize() -> JsValue {
    let result = rust_initialize().await;
    result
}
#[wasm_bindgen]
pub fn set_scheme(scheme: String) {
    rust_set_encryption_scheme(scheme);
}
#[wasm_bindgen]
pub fn setup_context(
    poly_modulus_degree: i32,
    bit_sizes: Vec<i32>,
    bit_size: i32,
    security_level: String,
) {
    rust_setup_context(poly_modulus_degree, bit_sizes, bit_size, security_level);
}

#[wasm_bindgen]
pub fn encrypt() {
    rust_encrypt();
}

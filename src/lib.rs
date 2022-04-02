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
    async fn js_to_rust_initialize() -> JsValue;
    fn js_to_rust_set_encryption_scheme(scheme: String) -> JsValue;
    fn js_to_rust_setup_context(
        poly_modulus_degree: i32,
        bit_sizes: Vec<i32>,
        bit_size: i32,
        security_level: String,
    ) -> JsValue;
    fn js_to_rust_generate_keys() -> Vec<JsValue>;
    fn js_to_rust_encrypt(array: Vec<i32>, public_key: JsValue) -> JsValue;
    fn js_to_rust_decrypt(array: Vec<i32>, secret_key: JsValue) -> JsValue;
}

#[wasm_bindgen]
pub async fn rust_initialize() -> JsValue {
    let result = js_to_rust_initialize().await;
    result
}
#[wasm_bindgen]
pub fn rust_set_scheme(scheme: String) {
    js_to_rust_set_encryption_scheme(scheme);
}
#[wasm_bindgen]
pub fn rust_setup_context(
    poly_modulus_degree: i32,
    bit_sizes: Vec<i32>,
    bit_size: i32,
    security_level: String,
) {
    js_to_rust_setup_context(poly_modulus_degree, bit_sizes, bit_size, security_level);
}

#[wasm_bindgen]
pub fn rust_generate_keys() -> Vec<JsValue> {
    let result = js_to_rust_generate_keys();
    result
}

#[wasm_bindgen]
pub fn rust_encrypt(array: Vec<i32>, public_key: JsValue) -> JsValue {
    let result = js_to_rust_encrypt(array, public_key);
    result
}

#[wasm_bindgen]
pub fn rust_decrypt(array: Vec<i32>, secret_key: JsValue) -> JsValue {
    let result = js_to_rust_decrypt(array, secret_key);
    result
}

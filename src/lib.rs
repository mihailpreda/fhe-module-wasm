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
    /* SETUP */
    /********************************************************************************************************* */
    async fn js_to_rust_initialize() -> JsValue;
    fn js_to_rust_set_encryption_scheme(scheme: String) -> JsValue;
    fn js_to_rust_setup_context(
        poly_modulus_degree: i32,
        bit_sizes: Vec<i32>,
        bit_size: i32,
        security_level: String,
    ) -> JsValue;
    fn js_to_rust_fast_setup(
        scheme: String,
        security_level: String,
        processing_speed: String,
    ) -> Vec<JsValue>;
    /********************************************************************************************************* */
    /* BASIC */
    /********************************************************************************************************* */
    fn js_to_rust_generate_keys() -> Vec<JsValue>;
    fn js_to_rust_encrypt(array: Vec<i32>, public_key: JsValue) -> JsValue;
    fn js_to_rust_decrypt(array: String, secret_key: JsValue) -> JsValue;
    /********************************************************************************************************* */
    /* CIPHER */
    /********************************************************************************************************* */
    fn js_to_rust_add_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue;
    fn js_to_rust_sub_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue;
    fn js_to_rust_multiply_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue;
    fn js_to_rust_square_cipher(cipher_text1: String) -> JsValue;
    fn js_to_rust_exponentiate_cipher(cipher_text1: String, power: i32) -> JsValue;
    fn js_to_rust_negate_cipher(cipher_text1: String) -> JsValue;
    /********************************************************************************************************* */
    /* PLAIN */
    /********************************************************************************************************* */
    fn js_to_rust_add_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue;
    fn js_to_rust_sub_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue;
    fn js_to_rust_multiply_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue;
    /********************************************************************************************************* */
    /* MEMORY MANAGEMENT */
    /********************************************************************************************************* */
    fn js_to_rust_deallocate_context();
    fn js_to_rust_deallocate_parameters();
    fn js_to_rust_deallocate_seal_library();
    fn js_to_rust_deallocate_module();
    /********************************************************************************************************* */
    /* EXPERIMENTAL */
    fn js_to_rust_sum_elements(cipher_text1: String, scheme: String) -> JsValue;
    /********************************************************************************************************* */
}
/* SETUP */
/********************************************************************************************************* */
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
pub fn rust_fast_setup(scheme: String, security_level: String, processing_speed: String) {
    js_to_rust_fast_setup(scheme, security_level, processing_speed);
}
/********************************************************************************************************* */
/* BASIC */
/********************************************************************************************************* */
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
pub fn rust_decrypt(array: String, secret_key: JsValue) -> JsValue {
    let result = js_to_rust_decrypt(array, secret_key);
    result
}
/********************************************************************************************************* */
/* CIPHER */
/********************************************************************************************************* */
#[wasm_bindgen]
pub fn rust_add_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue {
    let result = js_to_rust_add_ciphers(cipher_text1, cipher_text2);
    result
}

#[wasm_bindgen]
pub fn rust_sub_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue {
    let result = js_to_rust_sub_ciphers(cipher_text1, cipher_text2);
    result
}
#[wasm_bindgen]
pub fn rust_multiply_ciphers(cipher_text1: String, cipher_text2: String) -> JsValue {
    let result = js_to_rust_multiply_ciphers(cipher_text1, cipher_text2);
    result
}

#[wasm_bindgen]
pub fn rust_square_cipher(cipher_text1: String) -> JsValue {
    let result = js_to_rust_square_cipher(cipher_text1);
    result
}

#[wasm_bindgen]
pub fn rust_exponentiate_cipher(cipher_text1: String, power: i32) -> JsValue {
    let result = js_to_rust_exponentiate_cipher(cipher_text1, power);
    result
}

#[wasm_bindgen]
pub fn rust_negate_cipher(cipher_text1: String) -> JsValue {
    let result = js_to_rust_negate_cipher(cipher_text1);
    result
}
/********************************************************************************************************* */
/* PLAIN */
/********************************************************************************************************* */
#[wasm_bindgen]
pub fn rust_add_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue {
    let result = js_to_rust_add_plain(cipher_text, plain_text);
    result
}

#[wasm_bindgen]
pub fn rust_sub_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue {
    let result = js_to_rust_sub_plain(cipher_text, plain_text);
    result
}

#[wasm_bindgen]
pub fn rust_multiply_plain(cipher_text: String, plain_text: Vec<i32>) -> JsValue {
    let result = js_to_rust_multiply_plain(cipher_text, plain_text);
    result
}
/********************************************************************************************************* */
/* MEMORY MANAGEMENT */
/********************************************************************************************************* */
#[wasm_bindgen]
pub fn rust_deallocate_context() {
    js_to_rust_deallocate_context()
}

#[wasm_bindgen]
pub fn rust_deallocate_parameters() {
    js_to_rust_deallocate_parameters()
}

#[wasm_bindgen]
pub fn rust_deallocate_seal_library() {
    js_to_rust_deallocate_seal_library()
}

#[wasm_bindgen]
pub fn rust_deallocate_module() {
    js_to_rust_deallocate_module()
}
/********************************************************************************************************* */
/* EXPERIMENTAL */
/********************************************************************************************************* */
// #[wasm_bindgen]
// pub fn rust_sum_elements(cipher_text1: String, scheme: String) -> JsValue {
//     let result = js_to_rust_sum_elements(cipher_text1, scheme);
//     result
// }

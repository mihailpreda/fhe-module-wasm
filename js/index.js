import("../pkg/index.js")
  .then(async (module) => {
    await module.rust_initialize();
    module.rust_set_scheme("bfv");
    module.rust_setup_context(4096, [36, 36, 37], 20, "tc128");
    const [publicKey, secretKey] = module.rust_generate_keys();
    const data = [6, 5, 4, 3, 2, 1];
    console.log("plain", data);
    const encrypted = module.rust_encrypt(data, publicKey);
 
    let intermediaryResult;
     
    intermediaryResult = module.rust_decrypt(encrypted, secretKey);
    console.log("decrypted", intermediaryResult);
    
    module.rust_deallocate_module();
  })
  .catch(console.error);
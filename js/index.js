import("../pkg/index.js").then(async module => {
 
    await module.initialize();
    module.set_scheme('bfv');
    module.setup_context(4096,[36,36,37],20,'tc128')
    module.encrypt();
    
}).catch(console.error);

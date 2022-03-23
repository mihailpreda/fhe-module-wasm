import("../pkg/index.js").then(async module => {
    console.log('module', module);
    await module.init();
    module.enc('tipa');
}).catch(console.error);

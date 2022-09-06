import app from "./app";
import AppDataSource from "./data-source";

( async () => {
    
    await AppDataSource.initialize()
    .then(() => {
        console.log("...data source running")
    })
    .catch((err) => {
        console.error(err)
    })

    app.listen(3000, () => {
        console.log("...api running")
    })

})()
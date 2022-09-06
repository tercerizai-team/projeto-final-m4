import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config"


( async () => {
    
    await AppDataSource.initialize()
    .then(() => {
        console.log("...data source running")
    })
    .catch((err) => {
        console.error(err)
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log("...api running")
    })

})()
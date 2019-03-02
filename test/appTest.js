const {Builder, By, Key, until} = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

(async function setUp() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const testCases = ["PLACE 0,0,NORTH\nMOVE\nREPORT",
        "PLACE 0,0,NORTH\nLEFT\nREPORT",
        "PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT",
        "PLACE 0,0,EAST\nMOVE\nREPORT",
        "PLACE 0,0,WEST\nMOVE\nREPORT",
        "PLACE 0,0,SOUTH\nMOVE\nREPORT",
        "PLACE 5,5,SOUTH\nMOVE\nREPORT",
        "PLACE 4,4,NORTH\nMOVE\nREPORT"]

        driver.navigate().to('http://localhost:3000/')
        
        for (var n=0;n<testCases.length;n++){
            driver.findElement(By.id('textArea')).sendKeys(testCases[n])
            driver.findElement(By.id('button')).click()

        }
    } finally {
        await driver.quit();
    }
}
)();

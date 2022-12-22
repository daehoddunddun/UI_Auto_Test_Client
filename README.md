# Kimdaeho Auto UX Test

- date : 2022/12/22

- summary: front-end UX auto test

- flow : 1.server execution > 2.api call > 3.Browser Connected > 4.UX Auto test 5.Server disconnect

- tool : puppeteer/React/express/postmain

---

# 1. Puppeteer Setting

1-1. puppeteer.launch({ headless: , args: }) --- puppeteer execution @headless : [true/false], args: ["--window-size=1920,1080"]

1-2. browser.newPage() --- puppeteer new page create

1-3. page.setViewport({width: , height:}); --- GUI view size Settings @width/hight[1920,1080]

# 2. Web control

2-1. page.goto(url) --- Move Page URL:Port

2-2. page.click() --- click event HTML_Element @[tag/class/id]

2-3. page.type() --- input typing HTML_Element @[tag/class/id]

2-4. page.waitForSelector() --- waiting created HTML_Element @[tag/class/id]

2-5. page.waitFor() --- delay setting @[seconds(number)]

2-6. page.evaluate() --- page scroll @[window.scroll~~~]

# 3. Sub

3-1. await browser.close() --- browserClose

3-2. await page.screenshot({ path: }) --- screenshot

---------------

![13223312](https://user-images.githubusercontent.com/98578138/209084045-db8f4c3b-6261-43a2-835e-8815c6186aa1.png)


![screen-recording](https://user-images.githubusercontent.com/98578138/209083605-634d63e9-ff6e-45c2-a6f8-9fd592864992.gif)

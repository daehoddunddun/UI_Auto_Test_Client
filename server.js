const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8081;

/* [API Call] */
app.use(cors());

app.get("/", async (req, res) => {
  await handleLogin();

  res.send("Client Auto Tset Server Connecting");
});

app.listen(port, () => {
  console.log(`서버가 ${port}로 실행중입니다.`);
});

/* [Auto Test] */
let handleLogin = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  }); // puppeteer 실행 // {headless: false}는 크롤링 과정을 GUI로 확인하기 위해 적용(없어도 이상 x)

  const page = await browser.newPage(); // 신규 browser page 생성

  await page.setViewport({
    width: 1080,
    height: 1080,
  }); // GUI View 사이즈 지정 - 개발자 도구를 띄울 수 있게 view - width 조정

  await page.goto("http://localhost:3001", { waitUntil: "networkidle2" }); // 코드 실행할 URL 접속

  await page.waitForSelector("input"); //SPA 환경에서 해당 태그가 랜더링 전까지 대기

  await page.click("div.contents-search-box > input"); //핵심기능step.1 - 키워드를 입력할 수 있게 Input 태그를 클릭
  await page.type("div.contents-search-box > input", "고추바삭유림기"); //핵심기능step.2 - 키워드를 입력
  await page.click("div.contents-search-box > button"); //핵심기능step.3 - 키워드 입력 후 검색 버튼 클릭

  await page.waitForSelector(".user-info-box"); //검색결과 - 유저정보 태그가 생성되기 전까지 대기
  await page.waitForSelector(".history-item-box"); //검색결과 - 전적정보 태그가 생성되기 전까지 대기
  await page.waitFor(1000);

  await page.click(".Day-shift-btn > path"); // 부가기능1. - 주간모드 > 야간모드
  await page.waitFor(500);
  await page.click(".night-shift-btn > path"); //부가기능2 - 야간모드 > 주간모드
  await page.waitFor(500);
  await page.click(".btn-primary"); // 부가기능 3 - menuModal toggle
  await page.waitFor(500);
  await page.click(".btn-primary");
  await page.waitFor(500);

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  await autoScroll(page); // autoScroll down을 통한 컨텐츠 생성 정상 확인

  await page.evaluate(() => {
    window.scroll(0, 0);
  }); // Scroll down 이후 페이지 최상단으로 이동

  await page.waitFor(1000);

  await browser.close(); // 브라우저 종료
};

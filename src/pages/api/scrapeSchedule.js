import puppeteer from "puppeteer";
import Redis from 'ioredis';
const redis = new Redis();

export default async function handler(req, res) {
  try {

    const cached = await redis.get('ipl-schedule-data-3');
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
    
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    page.on("console", (consoleObj) => console.log(consoleObj.text()));
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.goto("https://www.iplt20.com/matches/fixtures", {
      waitUntil: "networkidle0",
    });

    const schedule = await page.evaluate(() => {
      const matches = [];
      const matchCards = document.querySelectorAll("li.ng-scope"); 

      matchCards.forEach((card) => {
        const matchNumber = card
          .querySelector(".vn-matchOrder")
          ?.textContent.trim();

        const dateElement = card.querySelector(".vn-matchDate");
        const timeElement = card.querySelector(".vn-matchTime");
        const date = dateElement?.textContent.trim();
        const time = timeElement?.textContent.trim();

        const venue = card.querySelector(".vn-venueDet p")?.textContent.trim();

        const ticketAnchor=card.querySelector('.vn-ticnbtn a.buyTicketsIcon');
        const ticketLink=ticketAnchor?.href || null;


        const teamElements = card.querySelectorAll(".vn-shedTeam");
        const teamA = teamElements[0]
          ?.querySelector(".vn-teamName h3")
          ?.textContent.trim();
        const teamB = teamElements[1]
          ?.querySelector(".vn-teamName h3")
          ?.textContent.trim();

        const teamCodeElements = card.querySelectorAll(".vn-teamCode h3");
        const teamACode = teamCodeElements[0]?.textContent.trim();
        const teamBCode = teamCodeElements[1]?.textContent.trim();

        const teamLogos = card.querySelectorAll(".schTeamLogo");
        const teamALogo = teamLogos[0]?.src;
        const teamBLogo = teamLogos[1]?.src;

        const matchCenterLink = card.querySelector(".vn-matchBtn")?.href;

        matches.push({
          matchNumber,
          date,
          time,
          venue,
          teamA: {
            name: teamA,
            code: teamACode,
            logo: teamALogo,
          },
          teamB: {
            name: teamB,
            code: teamBCode,
            logo: teamBLogo,
          },
          matchCenterLink,
          ticketLink,
        });
      });

      return matches;
    });

    await redis.set('ipl-schedule-data-3', JSON.stringify({schedule}), 'EX', 3600);

    res.status(200).json({ schedule });
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
}

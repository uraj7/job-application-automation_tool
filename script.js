const puppeteer = require("puppeteer");
let { id, pass } = require("./secret");
let tab;
let dataFile = require("./data");

async function main() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            args: ["--start-maximized"]
        });

        let pages = await browser.pages();
        tab = pages[0];
        await tab.goto("https://internshala.com/");
        await tab.click("#header > div > nav > div.nav-cta-container > button.login-cta");
        await tab.type("input#modal_email", id);
        await tab.type("input#modal_password", pass);
        await tab.click("button#modal_login_submit");

        await tab.waitForNavigation({ waitUntil: "networkidle2" });
        await tab.click("#header > div > nav > div.collapse.navbar-collapse.navbar_desktop > ul > li.nav-item.dropdown.dropdown-hover.profile_container_hover > a");

        await tab.waitForSelector(".profile_options a", { visible: true });
let profile_options = await tab.$$(".profile_options a");
let app_urls = [];

// Ensure there are enough elements before proceeding
if (profile_options.length >= 11) {
    for (let i = 0; i < 11; i++) {
        let url = await tab.evaluate(function(ele) {
            return ele.getAttribute("href");
        }, profile_options[i]);
        app_urls.push(url);
    }
} else {
    console.error("Not enough profile options found");
}

        await new Promise(function(resolve) {
            setTimeout(resolve, 2000);
        });
        await tab.goto("https://internshala.com" + #profile-dropdown > div > div > div > ul > div > li:nth-child(4) > a);

        await tab.waitForSelector("#graduation-tab .ic-16-plus", { visible: true });
        await tab.click("#graduation-tab .ic-16-plus");
        await graduation(dataFile[0]);

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });

        await tab.waitForSelector(".next-button", { visible: true });
        await tab.click(".next-button");

        await training(dataFile[0]);

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });

        await tab.waitForSelector(".next-button", { visible: true });
        await tab.click(".next-button");

        await tab.waitForSelector(".btn.btn-secondary.skip.skip-button", { visible: true });
        await tab.click(".btn.btn-secondary.skip.skip-button");

        await workSample(dataFile[0]);

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });

        await tab.waitForSelector("#save_work_samples", { visible: true });
        await tab.click("#save_work_samples");

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });
        await application(dataFile[0]);

    } catch (error) {
        console.error("Error during automation:", error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function graduation(data) {
    await tab.waitForSelector("#degree_completion_status_pursuing", { visible: true });
    await tab.click("#degree_completion_status_pursuing");

    await tab.waitForSelector("#college", { visible: true });
    await tab.type("#college", data["College"]);

    await tab.waitForSelector("#start_year_chosen", { visible: true });
    await tab.click("#start_year_chosen");
    await tab.waitForSelector(".active-result[data-option-array-index='5']", { visible: true });
    await tab.click(".active-result[data-option-array-index='5']");

    await tab.waitForSelector("#end_year_chosen", { visible: true });
    await tab.click('#end_year_chosen');
    await tab.waitForSelector("#end_year_chosen .active-result[data-option-array-index='6']", { visible: true });
    await tab.click("#end_year_chosen .active-result[data-option-array-index='6']");

    await tab.waitForSelector("#degree", { visible: true });
    await tab.type("#degree", data["Degree"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#stream", { visible: true });
    await tab.type("#stream", data["Stream"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#performance-college", { visible: true });
    await tab.type("#performance-college", data["Percentage"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    await tab.click("#college-submit");
}

async function training(data) {
    await tab.waitForSelector(".experiences-tabs[data-target='#training-modal'] .ic-16-plus", { visible: true });
    await tab.click(".experiences-tabs[data-target='#training-modal'] .ic-16-plus");

    await tab.waitForSelector("#other_experiences_course", { visible: true });
    await tab.type("#other_experiences_course", data["Training"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    await tab.waitForSelector("#other_experiences_organization", { visible: true });
    await tab.type("#other_experiences_organization", data["Organization"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    await tab.click("#other_experiences_location_type_label");

    await tab.click("#other_experiences_start_date");

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    await tab.waitForSelector(".ui-state-default[href='#']", { visible: true });
    let date = await tab.$$(".ui-state-default[href='#']");
    await date[0].click();
    await tab.click("#other_experiences_is_on_going");

    await tab.waitForSelector("#other_experiences_training_description", { visible: true });
    await tab.type("#other_experiences_training_description", data["description"]);

    await new Promise(function(resolve) {
        setTimeout(resolve, 2000);
    });

    await tab.click("#training-submit");
}

async function workSample(data) {
    await tab.waitForSelector("#other_portfolio_link", { visible: true });
    await tab.type("#other_portfolio_link", data["link"]);
}

async function application(data) {
    await tab.goto("https://internshala.com/the-grand-summer-internship-fair");

    await tab.waitForSelector(".btn.btn-primary.campaign-btn.view_internship", { visible: true });
    await tab.click(".btn.btn-primary.campaign-btn.view_internship");

    await new Promise(function(resolve) {
        setTimeout(resolve, 2000);
    });
    await tab.waitForSelector(".view_detail_button", { visible: true });
    let details = await tab.$$(".view_detail_button");
    let detailUrl = [];
    for (let i = 0; i < 3; i++) {
        let url = await tab.evaluate(function(ele) {
            return ele.getAttribute("href");
        }, details[i]);
        detailUrl.push(url);
    }

    for (let i of detailUrl) {
        await apply(i, data);
        await new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });
    }
}

async function apply(url, data) {
    await tab.goto("https://internshala.com" + url);

    await tab.waitForSelector(".btn.btn-large", { visible: true });
    await tab.click(".btn.btn-large");

    await tab.waitForSelector("#application_button", { visible: true });
    await tab.click("#application_button");

    await tab.waitForSelector(".textarea.form-control", { visible: true });
    let ans = await tab.$$(".textarea.form-control");

    for (let i = 0; i < ans.length; i++) {
        if (i == 0) {
            await ans[i].type(data["hiringReason"]);
            await new Promise(function(resolve) {
                setTimeout(resolve, 1000);
            });
        } else if (i == 1) {
            await ans[i].type(data["availability"]);
            await new Promise(function(resolve) {
                setTimeout(resolve, 1000);
            });
        } else {
            await ans[i].type(data["rating"]);
            await new Promise(function(resolve) {
                setTimeout(resolve, 1000);
            });
        }
    }

    // Check for the relocation checkbox and click if it exists
    const relocationCheckboxSelector = '#single_location > div:nth-child(2) > div.form-group.has-error > div > label';
    const relocationCheckbox = await tab.$(relocationCheckboxSelector);

    if (relocationCheckbox) {
        console.log('Relocation checkbox found, clicking it...');
        await tab.waitForSelector(relocationCheckboxSelector, { visible: true, timeout: 60000 });
        await tab.click(relocationCheckboxSelector);
    } else {
        console.log('Relocation checkbox not found, continuing...');
    }

    await tab.click(".submit_button_container");

    // Wait for 4 seconds to ensure the application is submitted correctly
    await new Promise(function(resolve) {
        setTimeout(resolve, 4000);
    });

    console.log('Application submitted successfully');
}

main();

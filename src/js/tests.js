

mocha.setup("bdd");
const assert = require("assert");
const jsdom = require('mocha-jsdom')
describe("SimpleVideoPlayer", () => {
    jsdom();
    let el;
    beforeEach(() => {
        el = document.createElement('div');
    });
    const url =
        "https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4";
    it("is constructor", () => {
        assert.ok(typeof SimpleVideoPlayer === "function");
        assert.ok(
            new SimpleVideoPlayer(
                el,
                url
            ) instanceof SimpleVideoPlayer
        );
    });
    it("render video on init", () => {
        let player = new SimpleVideoPlayer(
            el,
            url
        );
        let video = el.querySelector("video");
        assert.equal(video.getAttribute("src"), url, "renders correct video url");
    });
    it("toggle video state", () => {
        let a = 0;
        let player = new SimpleVideoPlayer(
            el,
            url
        );
        let video = el.querySelector("video");
        assert.ok(
            el.querySelector('[data-role="play-pause"].paused'),
            "stopped on load"
        );
        let btn = el.querySelector('[data-role="play-pause"]');
        video.play = () => { a++ };
        video.pause = () => { a += 2 };
        btn.click();
        assert.equal(a, 1, "play after stopped");
        btn.click();
        assert.equal(a, 3, "stop after play");
    });
});

mocha.run();
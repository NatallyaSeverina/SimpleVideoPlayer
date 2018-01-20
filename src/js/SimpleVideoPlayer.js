class SimpleVideoPlayer {
    constructor(htmlEl, src) {
        this.htmlEl = htmlEl;
        this.src = src;
        this.playState = false;
        this.render();
        this.videoEl = this.htmlEl.querySelector("video");
        this.addHandlers();
    }

    render() {
        this.htmlEl.innerHTML = `
        <div class="videoPlayer"
            <div class="videoWrapper">
                <video class="video" src=${this.src}></video>
            </div>
            <div class="controlsWrapper">
                <div class="progressBarWrapper">
                    <progress class="progressBar" value="0"></progress>
                </div>
                <div class="controls">
                    <button data-role="play-pause" class="paused"></button>
                </div>
            </div>
        </div>`;
    }

    addHandlers() {
        const progressEl = this.htmlEl.querySelector(".progressBar");
        const btnEl = this.htmlEl.querySelector('[data-role="play-pause"]');
        //this.videoEl.addEventListener("durationchange", data => {
        //    progressEl.setAttribute("max", this.videoEl.duration);
        //}
       // );
        this.videoEl.addEventListener("timeupdate", data => {
            progressEl.setAttribute("value", this.videoEl.currentTime);
        }
        );
        this.videoEl.addEventListener("play", data => {
            btnEl.setAttribute("class", "played");
        }
        );
        this.videoEl.addEventListener("pause", data => {
            btnEl.setAttribute("class", "paused");
        }
        );
        this.videoEl.addEventListener("ended", data => {
            this.playState = false;
            this.videoEl.currentTime = 0;
        });

        btnEl.addEventListener("click", ev => {
            this.clickHandler()
        }
        );
        this.htmlEl.querySelector("progress").addEventListener("click", ev => {
            let time = parseFloat(ev.target.getAttribute("max")) * ev.offsetX / ev.target.offsetWidth;
            this.progressHandler(time);
        });
    }

    clickHandler() {
        this.playState ? this.videoEl.pause() : this.videoEl.play();
        this.playState = !this.playState;
    }

    progressHandler(time) {
        this.videoEl.currentTime = time;
    }
}
export default SimpleVideoPlayer;
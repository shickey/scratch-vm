// const MathUtil = require('../util/math-util');
// const Cast = require('../util/cast');
// const Clone = require('../util/clone');

class Scratch3VideoBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            video_playuntildone: this.playVideoAndWait
        };
    }

    playVideoAndWait (args, util) {
        // const index = this._getSoundIndex(args.SOUND_MENU, util);
        // if (index >= 0) {
        //     const soundId = util.target.sprite.sounds[index].soundId;
        //     if (util.target.audioPlayer === null) return;
        //     return util.target.audioPlayer.playSound(soundId);
        // }

        console.log("playing video");

        // Start video and begin timer
        if (!util.stackFrame.timer) {
            // If extension interface is available, send video start command
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'startPlayback',
                    args: []
                });
            }

            // Yield
            util.stackFrame.timer = new Timer();
            util.stackFrame.timer.start();
            util.yield();
        } else {
            if (util.stackFrame.timer.timeElapsed() < 1000 * durationSeconds) {
                util.yield();
            } else {
                if (typeof window.ext !== 'undefined') {
                    window.ext.postMessage({
                        extension: 'video',
                        method: 'stopPlayback',
                        args: []
                    });
                }
            }
        }
    }

    stopAllVideos () {
        // if (this.runtime.targets === null) return;
        // const allTargets = this.runtime.targets;
        // for (let i = 0; i < allTargets.length; i++) {
        //     this._stopAllSoundsForTarget(allTargets[i]);
        // }
    }

}

module.exports = Scratch3SoundBlocks;

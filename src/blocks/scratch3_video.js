const uid = require('../util/uid');

class Scratch3VideoBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * Maps each video playback promise to a unique ID
         * so that they can be accessed from outside JS
         */
        this.videoPromiseRegistry = {};

        window.resolveVideoPromise = (resolveId) => {
            this.videoPromiseRegistry[resolveId]();
        }
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            video_playuntildone: this.playVideoUntilDone,
            video_start: this.startVideo,
            video_rotaterightby: this.rotateRightBy,
            video_rotateleftby: this.rotateLeftBy,
            video_setrotation: this.setRotation,
            video_changesizeby: this.changeSizeBy,
            video_setsize: this.setSize,
            video_changeeffectby: this.changeEffectBy,
            video_seteffectto: this.setEffectTo,
            video_clearvideoeffects: this.clearVideoEffects
        };
    }

    playVideoUntilDone (args, util) {

        return new Promise( resolve => {
            // Store the resolve id so that we can call
            // it from outside JS
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'playUntilDone',
                    videoIndex: +(args.VIDEO_MENU),
                    resolveId: resolveId
                });
            }
        });
    }

    startVideo (args, util) {

        return new Promise( resolve => {
            // Store the resolve id so that we can call
            // it from outside JS
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'startVideo',
                    videoIndex: +(args.VIDEO_MENU),
                    resolveId: resolveId
                });
            }
        });
    }

    rotateRightBy (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'rotateRightBy',
                    degrees: +(args.DEGREES),
                    resolveId: resolveId
                });
            }
        });
    }

    rotateLeftBy (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'rotateLeftBy',
                    degrees: +(args.DEGREES),
                    resolveId: resolveId
                });
            }
        });
    }

    setRotation (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'setRotation',
                    degrees: +(args.DEGREES),
                    resolveId: resolveId
                });
            }
        });
    }

    changeSizeBy (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'changeSizeBy',
                    percentage: +(args.PERCENTAGE),
                    resolveId: resolveId
                });
            }
        });
    }

    setSize (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'setSize',
                    percentage: +(args.PERCENTAGE),
                    resolveId: resolveId
                });
            }
        });
    }

    changeEffectBy (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'changeEffectBy',
                    effect: args.EFFECT,
                    change: +(args.CHANGE),
                    resolveId: resolveId
                });
            }
        });
    }

    setEffectTo (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'setEffectTo',
                    effect: args.EFFECT,
                    value: +(args.VALUE),
                    resolveId: resolveId
                });
            }
        });
    }

    clearVideoEffects (args, util) {
        return new Promise( resolve => {
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'clearVideoEffects',
                    resolveId: resolveId
                });
            }
        });
    }


}

module.exports = Scratch3VideoBlocks;

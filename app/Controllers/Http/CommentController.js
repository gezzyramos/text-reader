'use strict'

const Comment = use('App/Models/Comment')
const Env = use('Env')

const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');

/**
 * Resourceful controller for interacting with comment
 */
class CommentController {
    /**
     * Show a list of all comment.
     * GET comment
     */
    async index({ request, response, view }) {
        const comment = await Comment.all()
        return view.render('home', { comments: comment.rows })
    }

    /**
     * Render a form to be used for creating a new comment.
     * GET comment/create
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new comment.
     * POST comment
     */
    async store({ request, response }) {

        const comment = new Comment();
        comment.text = request.input('text')

        if (comment.text == '' || comment.text == null) {
            return;
        }

        if (await comment.save()) {
            const audioPath = await this.textToAudio(comment);
            comment.audioPath = audioPath;
            return comment;
        }

    }

    /**
     * Display a single comment.
     * GET comments/:id
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing comment.
     * GET comments/:id/edit
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update comment details.
     * PUT or PATCH comments/:id
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a comment with id.
     * DELETE comments/:id
     */
    async destroy({ params, request, response }) {
        const { id } = params
        const comment = await Comment.find(id)
        comment.text = request.input('text')

        if (await comment.delete()) {
            if (await this.removeAudio(comment.id)) {
                return comment
            }
        }
    }

    textToAudio(comment) {

        const commentId = comment.id
        const commentText = comment.text

        var textToSpeech = new TextToSpeechV1({
            iam_apikey: Env.get('SPEECH_KAY'),
            url: Env.get('SPEECH_URL')
        })

        var synthesizeParams = {
            text: commentText,
            accept: 'audio/mp3',
            voice: 'en-US_AllisonVoice'
        };

        return new Promise(resolve => {
            textToSpeech.synthesize(synthesizeParams, (error, voice) => {
                if (error) {
                    console.log('error', error)
                } else {
                    const audioPath = `public/files/${commentId}.mp3`
                    const wavstream = fs.createWriteStream(audioPath)
                    wavstream.write(voice)
                    wavstream.end()
                    resolve(audioPath)
                }
            });
        })

    }

    removeAudio(commentId) {
        const audioPath = `public/files/${commentId}.mp3`

        return new Promise(resolve => {
            fs.unlink(audioPath, (error) => {
                if (error) return console.log(error);
                resolve(true)
            })
        })
    }
}

module.exports = CommentController

'use strict'

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {
  /**
   * Show a list of all messages.
   * GET messages
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new message.
   * GET messages/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new message.
   * POST messages
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single message.
   * GET messages/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing message.
   * GET messages/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update message details.
   * PUT or PATCH messages/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a message with id.
   * DELETE messages/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MessageController

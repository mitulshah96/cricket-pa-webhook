(function() {
  'use strict';
  const envConfig = require('/secrets/pa_webhooks/envConfig');
  const express = require('express');
  const Stream = require('stream');
  const request = require('request');
  const Gateway = require('../controllers/gateway');
  const handleAccess = require('../middlewares/access');
  const accessconfig = require('../config/access');
  const TokenModel = require('../models/token');
  const AWS = require('aws-sdk');
  const router = express.Router();

  const client_access_token =
    `${
      envConfig.PA_service.admin[envConfig.environment].client_access_token
    }` || 'local';

  // =================================================================
  // ========================= Polly API ===============================
  // =================================================================

  // Create an Polly client
  const Polly = new AWS.Polly({
    accessKeyId: 'AKIAJQ5TGHQ3Z5XCGPTA',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

  router.post('/speak', (req, res) => {
    const query = req.query;
    // query.text =
    //   query.text !== "undefined" ? query.text : "Hi, please enter some text.";
    // let params = {
    // 	Text: query.text,
    // 	OutputFormat: "mp3",
    // 	VoiceId: query.voiceId || "Joanna"
    // };

    let paramsSsml = {
      Text: req.body.text,
      OutputFormat: 'mp3',
      VoiceId: query.voiceId || 'Joanna',
      TextType: 'ssml'
    };

    Polly.synthesizeSpeech(paramsSsml, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          const bufferStream = new Stream.PassThrough();
          // Write your buffer
          bufferStream.end(new Buffer(data.AudioStream));
          res.set({
            'Content-Type': 'audio/mpeg'
          });
          bufferStream.on('error', bufferError => {
            debug(bufferError);
            res.status(400).end();
          });
          // Pipe it to something else  (i.e. stdout)
          bufferStream.pipe(res);
        }
      }
    });
  });

  router.post('/api/pams', (req, res) => {
    console.log('here');
    // console.log(req.body);
    var queryBody = req.body;
    var queryData = JSON.stringify(queryBody);

    request(
      {
        method: 'POST',
        uri: 'https://api.dialogflow.com/v1/query?v=20150910',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer f5c02716edf9479aaf2814a5f3dadf03'
        },
        body: queryData
      },
      function(err, response, body) {
        //it works!
        if (err) {
          self.emit('error', err);
        } else {
          console.log('=======success=======');
          const jsonData = JSON.parse(body);
          const result = jsonData.result;

          // const dataToSend = {
          //   id: jsonData.id,
          //   query: result.resolvedQuery,
          //   parameters: result.parameters,
          //   contexts: result.contexts,
          //   fulfillment: result.fulfillment
          // };

          // console.log(body);

          res.send(result);
        }
      }
    );
  });

  // =================================================================
  // ========================= Bot API ===============================
  // =================================================================

  /**
   *  @swagger
   *  /token:
   *   get:
   *      description: Retrieve user details
   *      tags: ['Authentication']
   *      produces:
   *          -   application/json
   *      parameters:
   *          -   name: query
   *              in: query
   *              description: provide unique identification identifier
   *              required: true
   *              schema:
   *                  required:
   *                      -   uuid
   *                  properties:
   *                      uuid:
   *                          type: string,
   *                          default: abc@gmail.com
   *      responses:
   *          200:
   *              description: Success response
   *              schema:
   *                  properties:
   *                      responseDesc:
   *                          type: string,
   *                          default: "Token Found"
   *                      data:
   *                          type: object
   *                          properties:
   *                              access:
   *                                  type: array
   *                                  items:
   *                                      type: string
   *                                      default: "59d9a2e8695293a55460c4d6"
   *                              uuid:
   *                                  type: string,
   *                                  default: "abfd8551-d5d6-4048-d771-05b419b7ed90"
   *                  error:
   *                      type: string
   *          default:
   *              description: Error response
   *              schema:
   *                  "properties":
   *                      "responseDesc":
   *                          type: string
   *                          default: "Token Finding Failed"
   *                      "data":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "error":
   *                          type: string
   *
   *
   */
  router.get('/token', async (req, res) => {
    const UUID = req.query.uuid;

    try {
      const result = await TokenModel.findOne({
        UUID: UUID
      });
      return res.status(200).json({
        responseDesc: 'Token Found',
        data: result,
        error: null
      });
    } catch (error) {
      return res.status(500).json({
        responseDesc: 'Token Finding Failed',
        data: null,
        error: error
      });
    }
  });

  /**
   *  @swagger
   *  /login:
   *   post:
   *      description: login to Personal Assistant Admin Panel
   *      tags: ['Authentication']
   *      produces:
   *          -   application/json
   *      parameters:
   *          -   name: body
   *              in: body
   *              description: provide username and password
   *              required: true
   *              schema:
   *                  required:
   *                      -   username
   *                      -   password
   *                  properties:
   *                      username:
   *                          type: string,
   *                          default: abc@gmail.com
   *                      password:
   *                          type: string
   *                          default: Machines
   *      responses:
   *          200:
   *              description: Success response
   *              schema:
   *                  properties:
   *                      responseDesc:
   *                          type: string,
   *                          default: "Logged in Successfully"
   *                      data:
   *                          type: object
   *                          properties:
   *                              access:
   *                                  type: array
   *                                  items:
   *                                      type: string
   *                                      default: "59d9a2e8695293a55460c4d6"
   *                              uuid:
   *                                  type: string,
   *                                  default: "abfd8551-d5d6-4048-d771-05b419b7ed90"
   *                  error:
   *                      type: string
   *          default:
   *              description: Error response
   *              schema:
   *                  "properties":
   *                      "responseDesc":
   *                          type: string
   *                          default: "Login Failure"
   *                      "data":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "error":
   *                          type: string
   *
   *
   */
  router.post('/login', async (req, res) => {
    const user = req.body;
    try {
      const result = await TokenModel.findOne({
        username: user.username,
        password: user.password
      });
      if (result) {
        return res.status(200).json({
          responseDesc: 'Logged in Successfully',
          data: {
            access: result.access,
            uuid: result.UUID
          },
          error: null
        });
      } else {
        throw new TypeError('No user found');
      }
    } catch (e) {
      return res.status(500).json({
        responseDesc: 'Login Failure',
        data: null,
        error: e
      });
    }
  });

  /**
   *  @swagger
   *  /signup:
   *   post:
   *      description: create new account for Personal Assistant Admin Panel
   *      tags: ['Authentication']
   *      produces:
   *          -   application/json
   *      parameters:
   *          -   name: body
   *              in: body
   *              description: provide username and password
   *              required: true
   *              schema:
   *                  required:
   *                      -   username
   *                      -   password
   *                      -   uuid
   *                  properties:
   *                      uuid:
   *                          type: string
   *                          default: "abfd8551-d5d6-4048-d771-05b419b7ed91"
   *                      username:
   *                          type: string
   *                          default: test@testmail.com
   *                      password:
   *                          type: string
   *                          default: testpass
   *      responses:
   *          200:
   *              description: Success response
   *              schema:
   *                  properties:
   *                      responseDesc:
   *                          type: string
   *                          default: "Registered Successfully"
   *                      data:
   *                          type: object
   *                          properties:
   *                              access:
   *                                  type: array
   *                                  items:
   *                                      type: string
   *                                      default: "59d9a2e8695293a55460c4d6"
   *                              uuid:
   *                                  type: string,
   *                                  default: "abfd8551-d5d6-4048-d771-05b419b7ed90"
   *                  error:
   *                      type: string
   *          default:
   *              description: Error response
   *              schema:
   *                  "properties":
   *                      "responseDesc":
   *                          type: string
   *                          default: "Registration Failure"
   *                      "data":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "error":
   *                          type: string
   *
   *
   */
  router.post('/signup', async (req, res) => {
    const user = req.body;

    const tokenModel = new TokenModel({
      UUID: user.uuid,
      username: user.username,
      password: user.password,
      access: []
    });

    try {
      const result = await TokenModel.findOne({
        username: user.username,
        password: user.password
      });

      if (result) {
        return res.status(500).json({
          responseDesc: 'User with same username exists.',
          data: null,
          error: null
        });
      } else {
        const data = await tokenModel.save();
        return res.status(200).json({
          responseDesc: 'Registered Successfully',
          data: {
            access: data.access,
            uuid: data.UUID
          },
          error: null
        });
      }
    } catch (error) {
      return res.status(500).json({
        responseDesc: 'Registration Failure',
        data: null,
        error: error
      });
    }
  });

  /**
   *  @swagger
   *  /userstatus:
   *   post:
   *      description: enable or disable access to particular intent
   *      tags: ['Intent']
   *      produces:
   *          -   application/json
   *      parameters:
   *          -   name: x-access-token
   *              in: header
   *              description: Token for authorization.
   *              required: true
   *              type: string
   *          -   name: body
   *              in: body
   *              description: provide username and password
   *              required: true
   *              schema:
   *                  required:
   *                      -   accessid
   *                      -   checked
   *                  properties:
   *                      accessid:
   *                          type: string
   *                          default: "59d9a2e8695293a55460c4d6"
   *                      checked:
   *                          type: boolean
   *                          default: true
   *      responses:
   *          200:
   *              description: Success response
   *              schema:
   *                  properties:
   *                      responseDesc:
   *                          type: string
   *                          default: "Access Updated"
   *                      data:
   *                          type: array
   *                          items:
   *                              type: object
   *                  error:
   *                      type: string
   *          default:
   *              description: Error response
   *              schema:
   *                  "properties":
   *                      "responseDesc":
   *                          type: string
   *                          default: "Access Updating Failed"
   *                      "data":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "error":
   *                          type: string
   *
   *
   */
  router.post('/userstatus', async (req, res) => {
    const UUID = req.headers['x-access-token'];
    const accessID = req.body.accessid;
    const checked = req.body.checked;
    let query = {};

    if (checked) {
      query = {
        $push: {
          access: accessID
        }
      };
    } else {
      query = {
        $pull: {
          access: {
            $in: [accessID]
          }
        }
      };
    }

    try {
      const result = await TokenModel.update(
        {
          UUID: UUID
        },
        query
      );
      return res.status(200).json({
        responseDesc: 'Access Updated',
        data: result,
        error: null
      });
    } catch (error) {
      return res.status(500).json({
        responseDesc: 'Access Updating Failed',
        data: null,
        error: error
      });
    }
  });

  /**
   *  @swagger
   *  /webhook:
   *   post:
   *      description: Webhook for dialogflow and alexa
   *      tags: ['Webhook']
   *      produces:
   *          -   application/json
   *      parameters:
   *          -   name: x-forwarded-proto
   *              in: header
   *              description: header to distinguish between dialogflow and alexa.
   *              type: string
   *              default: "apiai"
   *          -   name: body
   *              in: body
   *              description: dialogflow content
   *              required: true
   *              schema:
   *                  required:
   *                      -   sessionid
   *                      -   result
   *                  properties:
   *                      sessionid:
   *                          type: string
   *                          default: "abfd8551-d5d6-4048-d771-05b419b7ed90"
   *                      result:
   *                          type: object
   *                          properties:
   *                              source:
   *                                  type: string
   *                                  default: 'agent'
   *                              resolvedQuery:
   *                                  type: string,
   *                                  default: 'get all events'
   *                              speech:
   *                                  type: string
   *                                  default: ''
   *                              action:
   *                                  type: string
   *                                  default: 'calendar_events'
   *                              actionIncomplete:
   *                                  type: boolean
   *                                  default: false
   *                              metadata:
   *                                  type: object
   *                                  properties:
   *                                      intentId:
   *                                          type: string
   *                                          default: "3291345f-4f86-4398-b2b0-f825f4ccf87e"
   *                                      webhookUsed:
   *                                          type: string
   *                                          default: true
   *                                      webhookForSlotFillingUsed:
   *                                          type: string
   *                                          default: false
   *                                      intentName:
   *                                          type: string
   *                                          default: 'calendar-widget'
   *      responses:
   *          200:
   *              description: Success response
   *              schema:
   *                  properties:
   *                      "speech":
   *                          type: string
   *                          default: "Sample response"
   *                      "messages":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "displayText":
   *                          type: string
   *          default:
   *              description: Error response
   *              schema:
   *                  "properties":
   *                      "speech":
   *                          type: string
   *                          default: "Sample response"
   *                      "messages":
   *                          type: array
   *                          items:
   *                               type: string
   *                      "displayText":
   *                          type: string
   *
   *
   */
  router.post('/webhook', handleAccess, async (req, res) => {
    const gateway = new Gateway();

    try {
      let response = null;

      async function waterfall(body, config) {
        response = await gateway.handle_intent(body, config, response);
        if (!!config.callback) {
          const result = await gateway.handle_callbacks(config, body);
          return result;
        } else {
          return response;
        }
      }

      if (req.config.urls) {
        let body = null;

        for (const config of req.config.urls) {
          config.initiator = req.config.initiator;
          config.format = req.config.format;
          const payload = await waterfall(req.body, config);
          body = payload;
        }
        return res.json(body);
      } else {
        const payload = await waterfall(req.body, req.config);
        return res.json(payload);
      }
    } catch (error) {
      console.log(error);
      req.config = gateway.handle_error(req.config, error.message);
      return res.json(req.config.format);
    }
  });

  module.exports = router;
})();

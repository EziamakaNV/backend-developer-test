/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import response from '../response';

const firstName = Joi.string().min(3).max(15).required();
const lastName = Joi.string().min(3).max(15).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(20).required();
const teamName = Joi.string().min(6).max(30).required();
const numOfPlayers = Joi.number().integer().min(1).max(50)
  .required();
const id = Joi.string().min(6).max(30).required();
const dateTime = Joi.date().iso().required();
const status = Joi.string().valid('pending', 'completed').required();
const min_players = Joi.number().integer().min(1).max(50);
const max_players = Joi.number().integer().min(1).max(50);
const score = Joi.string().regex(/^\d+-\d+$/).required();
class Validations {
  static signUpValidation(req, res, next) {
    const schema = {
      firstName,
      lastName,
      email,
      password,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static signInValidation(req, res, next) {
    const schema = {
      email,
      password,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static addTeam(req, res, next) {
    const schema = {
      teamName,
      numOfPlayers,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static removeTeam(req, res, next) {
    const schema = {
      teamName,
    };
    const { error } = Joi.validate({ ...req.params }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static updatePlayers(req, res, next) {
    const schema = {
      teamName,
      numOfPlayers,
    };
    const { error } = Joi.validate({
      teamName: req.params.teamName,
      numOfPlayers: req.body.numOfPlayers,
    }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static findTeam(req, res, next) {
    const schema = {
      teamName,
    };
    const { error } = Joi.validate({ ...req.params }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static addFixture(req, res, next) {
    const schema = {
      homeTeam: teamName,
      awayTeam: teamName,
      dateTime,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static removeFixture(req, res, next) {
    const schema = {
      fixtureId: id,
    };
    const { error } = Joi.validate({ fixtureId: req.params.fixtureId }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static editFixture(req, res, next) {
    let schema;
    let validationObject;
    if (/dateTime/i.test(req.path)) {
      schema = { id, dateTime };
      validationObject = { id: req.params.fixtureId, dateTime: req.body.dateTime };
    } else if (/status/i.test(req.path)) {
      schema = { id, status };
      validationObject = { id: req.params.fixtureId, status: req.body.status };
    } else if (/score/i.test(req.path)) {
      schema = {
        score,
      };
      validationObject = { ...req.body };
    }
    const { error } = Joi.validate(validationObject, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static getFixture(req, res, next) {
    const schema = {
      fixtureId: id,
    };
    const { error } = Joi.validate({ fixtureId: req.params.fixtureId }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static publicTeamSearch(req, res, next) {
    const schema = {
      min_players,
      max_players,
    };
    const { error } = Joi.validate({ ...req.query }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static publicFixtureSearch(req, res, next) {
    const schema = {
      from: Joi.date().iso(),
      to: Joi.date().iso(),
    };
    const { error } = Joi.validate({ ...req.query }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }
}

export default Validations;

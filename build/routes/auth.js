"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _validations = _interopRequireDefault(require("../middleware/validations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

router.post('/signup/user', _validations.default.signUpValidation, _auth.default.signUp);
router.post('/signup/admin', _validations.default.signUpValidation, _auth.default.signUp);
router.post('/signin', _validations.default.signInValidation, _auth.default.signIn);
var _default = router;
exports.default = _default;
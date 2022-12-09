const crypto = require("crypto");
const { CustomError } = require("../middlewares/error_middlware");

const validator = require("./valid_helper");

const GETALL_HELPER = (MODEL_TYPE) => {
  return async (req, res, next) => {
    try {
      const result = await MODEL_TYPE.query();
      res.status(200).json({
        message: "Successfully Fetched",
        result: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  };
};
const GETBYID_HELPER = (MODEL_TYPE) => {
  return async (req, res, next) => {
    try {
      validator(req);
      const result = await MODEL_TYPE.query().findById(req.params.id);
      if (result == null)
        throw new CustomError(404,`${req.params.id} Not Found`);
      res.status(200).json({
        message: "Success",
        result: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  };
};
const CREATE_HELPER = (MODEL_TYPE) => {
  return async (req, res, next) => {
    try {
      validator(req);
      const uuid = crypto.randomUUID();
      req.body[MODEL_TYPE.idColumn] = uuid;
      await MODEL_TYPE.query().insert(req.body);
      res.status(200).json({
        message: `Successfully added`,
        result: req.body,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  };
};
const DELETE_HELPER = (MODEL_TYPE) => {
  return async (req, res, next) => {
    try {
      validator(req);
      const id = req.params.id;
      if ((await MODEL_TYPE.query().deleteById(id)) == 0)
        throw new CustomError(404,`${id} Not Found`);
      res.status(200).json({
        message: `Successfully deleted ${id}`,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  };
};
const UPDATE_HELPER = (MODEL_TYPE) => {
  return async (req, res, next) => {
    try {
      validator(req);
      req.body[MODEL_TYPE.idColumn] = req.params.id;
      const result = await MODEL_TYPE.query().upsertGraph(req.body);
      console.log(result);
      if (result == 0) throw new CustomError(404,`${req.params.id} Not Found`);
      res.status(200).json({
        message: `Successfully updated`,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  };
};

module.exports = {
  GETALL_HELPER: GETALL_HELPER,
  GETBYID_HELPER: GETBYID_HELPER,
  CREATE_HELPER: CREATE_HELPER,
  DELETE_HELPER: DELETE_HELPER,
  UPDATE_HELPER: UPDATE_HELPER,
};

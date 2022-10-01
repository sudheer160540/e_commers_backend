const City = require('../models/City');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const addCity = async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.send({ message: 'City Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addAllCity = async (req, res) => {
  try {
    await City.insertMany(req.body);
    res.status(200).send({
      message: 'City Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCity = async (req, res) => {
  try {
    const citys = await City.find({}).sort({ _id: -1 });
    res.send(citys);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCityById = async (req, res) => {
  try {
    const citys = await City.findById(req.params.id);
    res.send(citys);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCity = async (req, res) => {
  try {
    const citys = await City.findById(req.params.id);
    if (citys) {
      citys.name = req.body.name;
      citys.stateId = req.body.stateId;
      citys.status = req.body.status;
      await citys.save();
      res.send({ message: 'citys Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'citys not found!' });
  }
};

const deleteCity = (req, res) => {
  City.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'City Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addCity,
  addAllCity,
  getAllCity,
  getCityById,
  updateCity,
  deleteCity,
};

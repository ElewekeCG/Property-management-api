const userModel = require("../models/User");
const property = require("../models/property");
const transModel = require("../models/transaction");
const tenants = require("../models/tenant");
const expenses = require("../models/expenses");
const { translateError } = require("../utils/mongo_helper");
const bcrypt = require("bcrypt");
// const load = require("lodash");
const { createToken } = require("../utils/token");
const passwordOperations = require("../utils/password");
  
  exports.authenticateUser = async (username, password) => {
    try {
      const user = await userModel.findOne({ username });
      console.log(user);
  
      if (!user) return [false, "Incorrect username or password"];
  
      const { name, username: userUsername } = user;
  
      if (!(await passwordOperations.comparePassword(password, user.password)))
        return [false, "Incorrect username or password"];
  
      return [
        true,
        {
          token: await createToken(user.id),
          user: {
            name,
            username: userUsername,
          },
        },
      ];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "login failed"];
    }
  };

  exports.addProperty = async (body) => {
    try {
      const { landlord, rate, address, moneyAtHand} = body;
  
      const prop = await property.create({
        landlord,
        rate,
        address,
        moneyAtHand,
      });
      console.log(prop);
      if (!prop) return [false, "Failed to add property"];
  
      return [true, prop];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "Unable to add property"];
    }
  };

  exports.getprops = async () => {
    try {
      const properties = await property.find();
      return [true, properties];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "Unable to retrieve properties"];
    }
  };

  exports.searchProp = async (details) => {
    try {
      const result = await property.findOne({ landlord: details});
      return [true, result ];
    } catch(error) {
      console.log(error);
      return [false, translateError(error) || "no results found"];
    }
  };

  exports.createTrans = async (body) => {
    try {
      const {tenant, amountPaid, property, description} = body;
      const trans = await transModel.create({
        tenant,
        amountPaid, 
        property,
        description
      });

      if(!trans){
        return [false, "failed to add transaction"];
      } 
      console.log("transaction created!");
      return [true, trans];
    }
    catch(error){
      console.log(error);
      return [false, translateError(error) || "Unable to create transaction"];
    }
  };

  exports.addTenant = async (body) => {
    try {
      const { name, phone, address, rentPerYear, accommodationType} = body;
  
      const result = await tenants.create({
        name, 
        phone,
        address,
        rentPerYear,
        accommodationType,
      });
      console.log(result);
      if (!result){
        return [false, "Failed to add tenant"];
      } 
      return [true, result];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "Unable to add tenant"];
    }
  };

  exports.searchForTenant = async(body) => {
    try {
      const result = await tenants.findOne({name: body});
      if (!result) return [false, "No match found"];
  
      return [true, result];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "Unable to find tenants"];
    }
    
  };

  exports.addExpenses = async (propertyId, amount, narration) => {
    try {
        const expense = new expenses({
        prope: propertyId,
        amount,
        narration,
      });

      const savedExpense = await expense.save();
      if(!savedExpense){
        return [false, "unable to add expense"];
      }
      return [true, savedExpense];
    } catch (error) {
      console.log(error);
      return [false, translateError(error) || "Unable to add expenses"];
    }
  };

  // exports.getPropertyExpenses = async (landlord) => {
  //   try {
  //     const propertyExpenses = await expenses.aggregate([
  //       {
  //         $lookup: {
  //           from: 'property',
  //           localField: 'prope',
  //           foreignField: '_id',
  //           as: 'propExpenses',
  //         },
  //       },
  //       {
  //         $unwind: '$propExpenses',
  //       },
  //       { 
  //         $match: {
  //           'propExpenses.landlord': landlord,
  //         },
  //       },
  //     ]);

  //     console.log('comments after lookup:', propertyExpenses)

  //     if(!propertyExpenses || propertyExpenses.length === 0){
  //       return [false, "unable to retrieve expenses"];
  //     } else {
  //       console.log(propertyExpenses);
  //       return [true, propertyExpenses];
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return [false, translateError(error) || "Unable to retrieve expenses"];
  //   }
  // };

  exports.getAllExpenses = async () => {
    try {
      const exp = await expenses.find();
      return [true, exp];
    } catch (error){
      console.error(error);
      return [false, "failed to retrieve expenses"];
    }
  };
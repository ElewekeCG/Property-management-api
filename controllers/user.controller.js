const {
    authenticateUser, 
    addProperty,
    getprops,
    searchProp,
    createTrans,
    addTenant,
    searchForTenant,
    addExpenses,
    getAllExpenses,
 } = require("../services/user.service");
 
 const {responseHandler} = require("../utils/responseHandler");
 
 exports.login = async (req, res) => {
     try {
         const {username, password } = req.body;
 
         const check = await authenticateUser(username, password);
 
         if (!check[0]) return responseHandler(res, check[1], 400, false, null);
 
         const {token, user} = check[1];
 
         res.cookie("authToken", token, {
             secure: process.env.NODE_ENV === "production",
             maxAge: 1000 * 60 * 60 * 24, //24hrs
             httponly: true,
         });
 
         return responseHandler(res, "Login successful", 200, true, {
             token,
             user,
         });
     } catch (error) {
         console.error(error);
         return responseHandler(res, "A server error occured.", 500, false);
     }
 };
 
 exports.addProp = async(req, res) => {
     try {
         const result = await addProperty(req.body);
   
         if(!result[0]) return responseHandler(res,  result[1], 400, false, null);
   
         return responseHandler(res, "property added successfully", 200, true, result[1]);
     } catch (error) {
         console.error(error);
         return responseHandler(res, "server error", 500, false);
     }
 
 };
 
 exports.getAllprops = async (req, res) => {
     try {
       const props = await getprops();
   
       if (!props || props.length === 0) {
         return responseHandler(res, "no properties found", 400, false); 
       } 
       return responseHandler(res, `successful`, 200, true, props);
 
     } catch (error) {
       console.error(error);
       return responseHandler(res, "An error occurred. Server error", 500, false);
     } 
   };

exports.search = async(req, res) => {
    try {
        const result = await searchProp(req.body.landlord);
        console.log(result);
        return [true, result];
    } catch(error){
        console.error(error);
        return responseHandler(res, "server error", 500, false);
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const result = await createTrans(req.body);

        if(!result[0]){
            return responseHandler(res,  result[1], 400, false, null);
        }
        console.log(result);
        return responseHandler(res,  "Transaction created successfully", 200, true, result);
    } catch(error) {
        console.error(error);
        return responseHandler(res, "server error", 500, false);
    }
   };

   exports.createTenant = async(req, res) => {
    try {
        const result = await addTenant(req.body);
  
        if(!result[0]) return responseHandler(res,  result[1], 400, false, null);
  
        return responseHandler(res, "tenant added successfully", 200, true, result[1]);
    } catch (error) {
        console.error(error);
        return responseHandler(res, "server error", 500, false);
    }

};

exports.findTenant = async (req, res) => {
    try {
        const tenantSearch = await searchForTenant(req.body.name);
        if (!tenantSearch || tenantSearch.length === 0) {
            return responseHandler(res, "no tenants found", 400, false); 
        } 
        return responseHandler(res, `successful`, 200, true, tenantSearch);
    
    } catch (error) {
          console.error(error);
          return responseHandler(res, "An error occurred. Server error", 500, false);
        }    
};

exports.newExpenses = async (req, res) => {
    try {
        const {_id, amount, narration} = req.body;
        const savedExpense = await addExpenses(_id, amount, narration);
        // console.log(req.body);
        if(!savedExpense[0]){
            return responseHandler(res,  savedExpense[1], 400, false, null);
        }
        return responseHandler(res, "expense added successfully", 200, true, savedExpense); 
    } catch(error) {
        console.error(error);
        return responseHandler(res, "server error", 500, false);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expensesList = await getAllExpenses();
        if(!expensesList[0]){
            return responseHandler(res,  expensesList[1], 400, false, null);
        } else {
            return responseHandler(res, "successfull", 200, true, expensesList); 
        }
    } catch(error) {
        console.error(error);
        return responseHandler(res, "server error", 500, false);
    }
}



 
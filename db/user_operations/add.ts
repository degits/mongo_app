import User from "../model/user";

async function addUser(email: String, password: String) {
    try {
        await User.create({ email: email, password: password});
    } catch (e){
        //console.log(e)
        throw Error("User register failed !")
    }
 }

export default addUser
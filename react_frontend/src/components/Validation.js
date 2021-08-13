// Input validations
class Validation {
    checkUserValues(e) {
        let fn = e.firstName;
        fn = fn.match(/\d+/g);
        fn = parseInt(fn)

        let ln = e.lastName;
        ln = ln.match(/\d+/g);
        ln = parseInt(ln)

        if (e.firstName === null || e.firstName === "" || e.firstName === undefined || Number.isInteger(fn)) {
            return "Please enter valid firstname"
        }
    
        if (e.firstName.length < 3) {
            return "Please enter more than 3 characters for firstname"
        }
    
        if (e.lastName === null || e.lastName === "" || e.lastName === undefined || Number.isInteger(ln)) {
            return "Please enter valid lastname"
        }
    
        if (e.lastName.length < 2) {
            return "Please enter more than 3 characters for firstname"
        }

        if(e.emailId == null || e.emailId === "" || e.emailId === undefined) {
            return "Please enter mail"
        }
        return 'valid'
    }
}

export default new Validation();
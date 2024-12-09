class Person {
    constructor(name, gender, birthPlace) {
        this.name = name;
        this.gender = gender;
        this.birthPlace = birthPlace;
    }
    diplayPerson() {
        console.log("\nName :: " + this.name + "\nGender :: " + this.gender + "\nBirthPlace :: " + this.birthPlace);
    }
}

class Employee extends Person {

    constructor(name, gender, birthPlace, companyName, department) {
        super(name, gender, birthPlace);
        this.companyName = companyName;
        this.department = department;
    }
    diplayEmployee() {
        console.log("\nName :: " + this.name + "\nGender :: " + this.gender + "\nBirthPlace :: " + this.birthPlace + "\nCompany Name :: " + this.companyName + "\nDepartment Name :: " + this.department);
    }
}

function submitData() {
    var refToName = document.getElementById("name");
    var refToGender = document.getElementsByName("gender");
    var refToBirthPlace = document.getElementById("birthPlace");
    var refToCompanyName = document.getElementById("cmpName");
    var refToDeptName = document.getElementById("deptName");

    debugger;
    var empObj = new Employee(refToName.value, refToGender.value, refToBirthPlace.value, refToCompanyName.value, refToDeptName.value);
    empObj.diplayEmployee();
    empObj.diplayPerson();
}
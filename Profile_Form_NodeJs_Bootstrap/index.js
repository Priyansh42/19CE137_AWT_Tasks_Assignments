const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

app.use(bodyParser());

function fillData(template, data) {
    template = template.replace(/{%FNAME%}/g, data.fname);
    template = template.replace(/{%LNAME%}/g, data.lname);
    template = template.replace(/{%EMAIL%}/g, data.email);
    template = template.replace(/{%MOBILENO%}/g, data.mobileno);
    template = template.replace(/{%ADDRESS%}/g, data.address);
    template = template.replace(/{%GENDER%}/g, data.gender);
    template = template.replace(/{%DOB%}/g, data.dob);
    template = template.replace(/{%INSTITUTE%}/g, data.institute);
    template = template.replace(/{%DEPARTMENT%}/g, data.department);
    template = template.replace(/{%SEMESTER%}/g, data.semester);
    template = template.replace(/{%IDNO%}/g, data.idno);

    return template;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/form.html");
});

app.post("/profiledetails", (req, res) => {
    if (req.body.fname.length == 0) {
        req.body.fname = "<span class='text-danger'>First Name Is Required</span>";
    }
    else if (req.body.fname.length > 20) {
        req.body.fname = "<span class='text-danger'>First Name Length Is More Than 20 Characters</span>";
    }
    else {
        req.body.fname = `<span class='text-success'>${req.body.fname}</span>`;
    }
 
    if (req.body.lname.length == 0) {
        req.body.lname = "<span class='text-danger'>Last Name Is Required</span>";
    }
    else if (req.body.lname.length > 10) {
        req.body.lname = "<span class='text-danger'>Last Name Length Is More Than 10 Characters</span>";
    }
    else {
        req.body.lname = `<span class='text-success'>${req.body.lname}</span>`;
    }
 
    if (req.body.email == 0) {
        req.body.email = "<span class='text-danger'>Email Is Required</span>";
    }
    else {
        req.body.email = `<span class='text-success'>${req.body.email}</span>`;
    }
 
    if (req.body.mobileno.length == 0) {
        req.body.mobileno = "<span class='text-danger'>Mobile No. Is Required</span>";
    }
    else if (req.body.mobileno.length < 10) {
        req.body.mobileno = "<span class='text-danger'>Mobile No. Is Less Than 10 Numbers</span>";
    }
    else {
        req.body.mobileno = `<span class='text-success'>${req.body.mobileno}</span>`;
    }
 
    let today = new Date();
    let dob = new Date(req.body.dob);
 
    if (req.body.dob === "") {
        req.body.dob = "<span class='text-danger'>Date Of Birth Is Required</span>";
    }
    else if (today.getTime() < dob.getTime()) {
        req.body.dob = "<span class='text-danger'>Future Date</span>";
    }
    else {
        req.body.dob = `<span class='text-success'>${req.body.dob}</span>`;
    }
 
    if (req.body.gender === "Male" || req.body.gender === "Female") {
        req.body.gender = `<span class='text-success'>${req.body.gender}</span>`;
    }
    else {
        req.body.gender = `<span class='text-danger'>Gender Is Required</span>`;
    }
 
    if (req.body.address === "") {
        req.body.address = "<span class='text-danger'>Address Is Required</span>";
    }
    else {
        req.body.address = `<span class='text-success'>${req.body.address}</span>`;
    }

    if (req.body.idno.length == 0) {
        req.body.idno = "<span class='text-danger'>ID No. Is Required</span>";
    }
    else if (req.body.idno.length > 10) {
        req.body.idno = "<span class='text-danger'>ID No. Length Is More Than 10 Characters</span>";
    }
    else {
        req.body.idno = `<span class='text-success'>${req.body.idno}</span>`;
    }
 
    req.body.institute = `<span class='text-success'>${req.body.institute}</span>`;
    req.body.department = `<span class='text-success'>${req.body.department}</span>`;
    req.body.semester = `<span class='text-success'>${req.body.semester}</span>`;

    let viewProfileTemplate = fs.readFileSync(__dirname + "/html/profiledetails.html", "utf-8");
    let viewProfileHtml = fillData(viewProfileTemplate, req.body);
    res.contentType("text/html");
    res.send(viewProfileHtml);
});

app.listen(443, (req, res) => {
    console.log("Server is listning in 443...");
});
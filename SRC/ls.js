const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const hbs = require("hbs")
const path = require("path")
const body_parser = require("body-parser")
require("../SRC/connecttomongodb")
const Register = require("../SRC/register")
const views_path = path.join(__dirname, "../templates")
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

app.set("view engine", "hbs")
app.set("views", views_path)

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})

app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/save", async (req, res) => {
    try {
        const {
            username,
            password,
            rollno,
            branch,
            section,
            profilephoto,
            email,
            phoneno,
            localaddress,
            fathername,
            mothername,
            fatheroccupation,
            motheroccupation,
            fatherphoneno,
            fathermailid,
            motherphoneno,
            mothermailid,
            parentaddress,
            classxpercentage,
            classxiipercentage,
            declaration,
            mentoringdetails,
        } = req.body
        const isValidPhoneNumber = /^\d{10}$/;
        if (!isValidPhoneNumber.test(phoneno) || !isValidPhoneNumber.test(fatherphoneno) || !isValidPhoneNumber.test(motherphoneno)) {
            return res.send("Please enter valid 10-digit phone numbers for Phone, Father's Phone, and Mother's Phone.")
        }
        const registerSchema = new Register({
            username,
            password,
            rollno,
            branch,
            section,
            profilephoto,
            email,
            phoneno,
            localaddress,
            fathername,
            mothername,
            fatheroccupation,
            motheroccupation,
            fatherphoneno,
            fathermailid,
            motherphoneno,
            mothermailid,
            classxpercentage,
            classxiipercentage,
            declaration,
            mentoringdetails,
        })
        const data = await registerSchema.save()
        res.render("return")
    } catch (e) {
        console.log(e)
    }
})

app.get("/fetch", async (req, res) => {
    const fetch_data = await Register.find()
    res.send(fetch_data)
})
app.post("/auth", async (req, res) => {
    const { username, password } = req.body
    const count = await Register.find({ username }).countDocuments()
    if (count === 0) {
        res.render("failed")
    } else {
        const data = await Register.findOne({ username, password })
        if (data) {
            res.render("admin", { data })
        } else {
            res.render("failed")
        }
    }
})
app.post("/update", async (req, res) => {
    const {
        id,
        username,
        pass,
        rollno,
        branch,
        section,
        profilephoto,
        email,
        phoneno,
        localaddress,
        fathername,
        mothername,
        fatheroccupation,
        motheroccupation,
        fatherphoneno,
        fathermailid,
        motherphoneno,
        mothermailid,
        classxpercentage,
        classxiipercentage,
        declaration,
    } = req.body

    try {
        const updatedData = await Register.findByIdAndUpdate(
            id,
            {
                username,
                pass,
                rollno,
                branch,
                section,
                profilephoto,
                email,
                phoneno,
                localaddress,
                fathername,
                mothername,
                fatheroccupation,
                motheroccupation,
                fatherphoneno,
                fathermailid,
                motherphoneno,
                mothermailid,
                classxpercentage,
                classxiipercentage,
                declaration,
            },
            { new: true }
        )
        res.send(updatedData)
    } catch (e) {
        console.log(e)
    }
})
app.post("/delete", async (req, res) => {
    const { id } = req.body
    try {
        const deletedData = await Register.findByIdAndDelete(id)
        if (deletedData) {
            res.render("deleteds")
        } else {
            res.render("deletedf")
        }
    } catch (e) {
        console.log(e)
    }
})
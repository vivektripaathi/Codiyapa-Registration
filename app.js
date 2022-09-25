const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const app = express();

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.render('register', {success: ''});
});

app.post("/send", (req, res)=>{
    console.log(req.body);
    var service = req.body.service
    var str= "";
    if(service == "Coding Solution"){
      str = `
        <ul>
        <li>Date:  ${req.body.date}</li>
        <li>Company:  ${req.body.company}</li>
        <li>Time:  ${req.body.time}</li>
        </ul>
        `; 
    }
    else if(service == "College Project"){
      str = `
        <ul>
        <li>Date:  ${req.body.date}</li>
        <li>Project Type:  ${req.body.ProjectType}</li>
        </ul>
        `; 
    }
    else if(service == "College Assignment"){
        str = `
        <ul>
        <li>Date:  ${req.body.date}</li>
        <li>Semeseter:  ${req.body.semeseter}</li>
        </ul>
        `; 
    }
    else if(service == "Reasoning & Aptitude"){
      str = `
        <ul>
        <li>Date:  ${req.body.date}</li>
        <li>Time:  ${req.body.time}</li>
        </ul>
        `; 
    }
    const output = `
        <h3>Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Phone: <a href="https://api.whatsapp.com/send/?phone=+91${req.body.phone}&text=Hii ${req.body.name} &#128075;">${req.body.phone}</a></li>
            <li>Mail: ${req.body.email}</li>
            <li>Service : ${service}</li>
        </ul>
        ${str}
        <ul>
            <li>Description: ${req.body.message}</li>
        </ul>
        <p>Contact Team is kindly requsted to make contact with him/her as soon as possible</p>
    `;
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'codiyapasuppoort@gmail.com',
          pass: 'gavcubcpbpvhdpmn'
        }
      });
      
      var mailOptions = {
        from: '"CoDiYaPa" codiyapasuppoort@gmail.com',
        to: 'vivektripathi8005@gmail.com, akasaudhan02@gmail.com, mailtonihalsingh29@gmail.com, narayanaditya1728@gmail.com',
        subject: 'Codiyapa Attention Here! New Customer arrived',
        html: output
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('register', {success: 'Success'});
        res.redirect("/");
      });
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(" PORT : 3000")
});
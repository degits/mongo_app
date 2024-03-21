import express, { Express, Request, Response, Application } from 'express';

import mongoose from 'mongoose';
import addUser from './db/user_operations/add';
import deleteContact from './db/contact_operations/delete';
import addContact from './db/contact_operations/add';
import updateContact from './db/contact_operations/update';
import getContacts from './db/contact_operations/get';
//import Blog from './db/model/blog';


//! put this unside async
mongoose.connect("mongodb+srv://my123flutter:uQy7uEyxD9vjQvc@cluster0.2jg3vxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express();

const port = 8000//process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

/* Middlewares */
app.use(express.json())

//==============================================================

// Create New User
app.get('/create', async (req, res) => {
  await addUser(req.body.email, req.body.password)
  res.send("User create")
})

// Get User contacts
app.get('/get-contacts', async (req, res) => {
  const uid: string = req.query.uid as string
  let result = await getContacts(uid)
  res.send(result)
})

// Add new contact to user
app.get('/add-contact', async (req, res) => {
  let userId: string = req.query.uid as string;
  await addContact(
    userId,
    {
      fullName: req.body.fullName as string,
      gender: req.body.gender as string,
      phoneNumber: req.body.phoneNumber as string,
      email: req.body.email as string

    })
  res.send("User create")
})

// Delete user's contact
app.get('/delete-contact', async (req, res) => {
  const uid: string = req.body.uid
  const cid: string = req.body.cid
  await deleteContact(
    uid, cid
  )
  res.send('Delete contact')
})

// Update(edit) user's contact
app.get('/update-contact', async (req, res) => {
  const uid: string = req.body.uid as string
  const cid: string = req.body.cid as string
  await updateContact(
    uid,
    cid,
    {
      fullName: req.body.fullName as string,
      gender: req.body.gender as string,
      phoneNumber: req.body.phoneNumber as string,
      email: req.body.email as string

    }
  );
  res.send('Update contact')
})


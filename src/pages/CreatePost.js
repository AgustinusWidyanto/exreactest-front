import React from 'react';
import '../App.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function CreatePost() {

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: ""
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required()
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate('/');
    })
    console.log(data);
  }

  return (
    <div className='createPostpage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title: </label>
          <Field 
          autoComplete="off"
          id="inputCreatePost" 
          name="title"
           placeholder="(Ex. Title...)" />
           <ErrorMessage name='title' component='span' />

           <label>Post: </label>
          <Field 
          autoComplete="off"
          id="inputCreatePost" 
          name="postText"
           placeholder="(Ex. Post...)" />
           <ErrorMessage name='postText' component='span' />

           <label>Username: </label>
          <Field 
          autoComplete="off"
          id="inputCreatePost" 
          name="username"
          placeholder="(Ex. Name...)" />
          <ErrorMessage name='username' component='span' />
          <button type='submit' >Create Post</button>
        </Form>

      </Formik>
    </div>
  )
}

export default CreatePost
import React from 'react'
import '../App.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Registration() {

    let navigate = useNavigate();
    
    const [errMsg, setErrMsg] = useState("")
    const [errCl, setErrCl] = useState("")

    useEffect(() => {
    })

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
        
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            if(response.data.error){
                setErrMsg(response.data.error)
                setErrCl('')
            } else {
                setErrMsg("User berhasil ditambah")
                setErrCl('Success')
            }
        })
       
    }
    return (
        <div className='createPostpage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Username: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. Name...)" />
                    <ErrorMessage name='username' component='span' />

                    <label>Password: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="password"
                        placeholder="(Ex. Pass...)" />
                    <ErrorMessage name='password' component='span' />

                    <button type='submit' >Create Post</button>
                    <div className={"errLabel" + errCl}>{errMsg}</div>
                </Form>

            </Formik>
        </div>
    )
}

export default Registration
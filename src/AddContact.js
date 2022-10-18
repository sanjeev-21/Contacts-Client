import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddContact(props){
    const apiUrl = "http://localhost:8081";
    const [itemId, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ enableEdit, setEnableEdit] = useState(false)
    useEffect(()=>{
        const { editContact } = props;
        if(editContact !== undefined){
            setId(editContact._id)
            setName(editContact.name)
            setEmail(editContact.email)
            setPhoneNumber(editContact.contactNumber)
            setEnableEdit(true)
        }
    },[props.editContact])
    const SubmitButton = (props) => {
        return <button type="submit" class="txt2">Submit</button>;
      }
    const itemNameChange = (event) => {
        setName(event.target.value)
    }
    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setEnableEdit(false);
        let contactObj = {
            "name": name,
            "email": email,
            "contactNumber": phoneNumber,
        }
        axios.post(`${apiUrl}/contact/newContact`, contactObj).then(res=>{
            props.getContacts();
        })
      }
    const handleUpdate = (event) =>{
        event.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setEnableEdit(false)
        let contactObj = {
            "name": name,
            "email": email,
            "contactNumber": phoneNumber,
        }
        axios.put(`${apiUrl}/contact/updateContact/${itemId}`, contactObj).then(res=>{
            props.getContacts();
        })
    }
    return(
        <div class="container">
	<div class="row">
    <div class="col-md-4">
		<div class="form_main">
                <h4 class="heading"><strong>Quick </strong> Contact <span></span></h4>
                <div class="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Please enter your Name" value={name} onChange={itemNameChange} class="txt"/>
                    <input type="text" placeholder="Please enter your mobile No" value={phoneNumber} onChange={phoneNumberChange} class="txt"/>
                    <input type="text" placeholder="Please enter your Email" value={email} onChange={emailChange} class="txt"/>
                    <SubmitButton />
                </form>
            </div>
            </div>
            </div>
	</div>
</div>
    )
}
import React from 'react'
import { Segment, Button, Form, Message, Label} from 'semantic-ui-react';


const  addForm = ({error,firstName, lastName,phone, age, add,handleChange})=>{
  return(
  <Segment>
   <Form onSubmit={add}>
   <Form.Group widths='equal'>
      <Form.Field>
          <label>First Name</label>
          <input name="firstName" value={firstName}
            onChange = {handleChange} type="text" placeholder='First Name' required/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input name="lastName" value={lastName}
            onChange = {handleChange} type="text" placeholder='Last Name' required/>
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input name="age" value={age}
            onChange = {handleChange} type="number" min='1' max='100'placeholder='Age' required/>
        </Form.Field>
   </Form.Group>
     <Form.Field inline>
      <label>Phone</label>
      <input name="phone" value={phone}
        onChange = {handleChange} type="tel" placeholder='+XX(XXX)XXX-XX-XX' required/>
        <Label pointing='left'>Your phone must be in format +XX(XXX)XXX-XX-XX</Label>
    </Form.Field>
    {error?
    <Message color="red">
    <Message.Header>Error</Message.Header>
    <p>
      {error}
    </p>
  </Message>: null}
  <Button type='submit'>Add</Button>
  </Form>
  </Segment>
  );
}

export default addForm;
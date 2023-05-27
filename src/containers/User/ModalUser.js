import React, { Component } from 'react';
import './ModalUser.scss'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import userService from '../../services/userService';


class ModalUser extends Component {

   constructor(props) {
      super(props);
      this.state = {
         email: '',
         dataCheckEmail: []
      }
   }

   componentDidMount() {
      // let data = await userService.checkUserExists(this.state.email);
      // if (data && data.errCode === 0) {
      //    this.setState({ dataCheckEmail: data })
      // }
   }

   async componentDidUpdate() {
      let data = await userService.checkUserExists(this.state.email);
      console.log(data);
      if (data && data.errCode === 0) {
         this.setState({ dataCheckEmail: data })
      }
   }

   handleSubmitModal = () => {
      console.log('Do Something');
   }

   handleCheckUserExist = (e) => {
      this.setState({ email: e.target.value })
   }

   render() {
      return (
         <div className='container'>
            <Modal
               isOpen={this.props.isOpen}
               toggle={this.props.handleToggle}
               centered
               size='lg'
               labelledBy='id'
            >
               <ModalHeader toggle={this.props.handleToggle}>
                  <b>Create New User</b>
               </ModalHeader>
               <ModalBody>
                  <div className="container">
                     <div className="row">
                        <div className="col-12">
                           <form>
                              <div className="form-row">
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputDirstName">FirstName</label>
                                    <input
                                       onChange={(e) => this.handleCheckUserExist(e)}
                                       type="text"
                                       className="form-control"
                                       id="inputDirstName"
                                       name="firstName"
                                       placeholder="Doe" />
                                 </div>
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputLastName">LastName</label>
                                    <input type="text" className="form-control" id="inputLastName" name="lastName"
                                       placeholder="John" />
                                 </div>
                              </div>
                              <div className="form-row">
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" name="email"
                                       placeholder="example@gmail.com" />
                                 </div>
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4" name="password"
                                       placeholder="Password" />
                                 </div>
                              </div>
                              <div className="form-row">
                                 <div className="form-group col-md-12">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input type="text" className="form-control" id="inputAddress" name="address"
                                       placeholder="1234 Main St" />
                                 </div>
                              </div>

                              <div className="form-row">
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputPhoneNumber">PhoneNumber</label>
                                    <input type="text" className="form-control" id="inputPhoneNumber" name="phoneNumber"
                                       placeholder="+(84)-123-456-789" />
                                 </div>
                                 <div className="form-group col-md-6">
                                    <label htmlFor="inputGender">Gender</label>
                                    <select id="inputGender" className="form-control" name="gender">

                                       <option value="1">Male</option>
                                       <option value="0">Female</option>
                                    </select>
                                 </div>
                              </div>
                              <div className='form-row'>
                                 <div className="form-group col-md-12">
                                    <label htmlFor="inputRoleId">Role</label>
                                    <select id="inputRoleId" className="form-control" name="roleId">
                                       <option value="1">Admin</option>
                                       <option value="2">Doctor</option>
                                       <option value="3">Patient</option>
                                    </select>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button color="primary" className='btn-submit' onClick={() => this.handleSubmitModal()}>
                     Create
                  </Button>
                  <Button color="secondary" className='btn-submit' onClick={this.props.handleToggle}>
                     Cancel
                  </Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }

}

export default ModalUser

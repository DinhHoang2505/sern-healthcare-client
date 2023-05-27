import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import userService from '../../services/userService';
import ModalUser from '../User/ModalUser';
import { Button } from 'reactstrap';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataUSers: [],
            isOpenModal: false
        }
    }

    async componentDidMount() {
        let data = await userService.getAllUsers('All');
        if (data && data.errCode === 0) {

            this.setState({ dataUSers: data.users })
        }
    }

    handleAddNewUSer = () => {
        this.setState({ isOpenModal: true })
    }


    toggleUserModal = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal })
    }


    render() {
        return (
            <div className='container'>
                <div className='title text-center m-4'>Manage User</div>

                <div className='add-user'>
                    <Button className='btn btn-primary btn-add-user' color="primary" onClick={() => this.handleAddNewUSer()}>
                        <i className="fas fa-plus px-1"></i> Add New User
                    </Button>
                </div>

                <ModalUser
                    isOpen={this.state.isOpenModal}
                    handleToggle={this.toggleUserModal}
                />
                <table id="customers">
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataUSers.map(user => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn btn-outline-warning btn-action'>
                                        <i className=" fas fa-pencil-alt"></i> Edit
                                    </button>
                                    <button className='btn btn-outline-danger btn-action'>
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

import React from 'react';
import style from '../assets/buttons.css';
import { userService } from '@/_services';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
        this.handleDellClick = this.handleDellClick.bind(this);
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    handleDellClick(event) {
        userService.deleteById(event.target.id).then(users => this.setState({ users }));
    }

    renderUser(){
        if(!this.state.users){
            return null
        }
    return (<ul>{Object.values(this.state.users).map(user =>{ return <li key={user.id}>email: {user.email} button1: {user.btn1} button2: {user.btn2} button3: {user.btn3} <button className='btn-general' onClick={this.handleDellClick} id={user.id}>Delete</button></li>})}</ul>)
    }

    render() {
        const { users } = this.state;
        if(!users) return null;
        return (
            <div>
                <h1>Admin page</h1>
                {/* <p>{JSON.stringify(users, null, 2)}</p> */}
                <p>This page can only be accessed by administrators.</p>
                <p><h3>Users:</h3></p>
                {this.renderUser()}
            </div>
        );
    }
}

export { AdminPage };
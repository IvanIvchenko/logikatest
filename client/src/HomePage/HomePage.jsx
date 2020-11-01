import React from 'react';
import style from '../assets/buttons.css';
import {Countdown} from './Countdown';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ currentUser: authenticationService.currentUserValue  });

    }

    handleClick(event) {
        const user = this.state.currentUser;
        if(Date.now() - Date.parse(user.pressTime) >= 20000){
            authenticationService.buttonPush(user.email, event.target.id)
            .then(currentUser => this.setState({currentUser}))
        }
    }



    render() {
        const { currentUser } = this.state;
        if(!currentUser) return null;
        const remainingTime = 20 - Math.floor((Date.now() - Date.parse(currentUser.pressTime))/1000);
        return (
            <div>
                <h1>Home</h1>
                <p>Your role is: <strong>{currentUser && currentUser.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div className='btn-block'>
                    <button className='btn-home' id='btn1' onClick={this.handleClick}>Preses: {currentUser.btn1}</button>
                    <button className='btn-home' id='btn2' onClick={this.handleClick}>Preses: {currentUser.btn2}</button>
                    <button className='btn-home' id='btn3' onClick={this.handleClick}>Preses: {currentUser.btn3}</button>
                </div>
                {remainingTime <= 20 &&
                <Countdown className="countdown" seconds={20 - Math.floor((Date.now() - Date.parse(currentUser.pressTime))/1000)} />
                }
            </div>
        );
    }
}

export { HomePage };
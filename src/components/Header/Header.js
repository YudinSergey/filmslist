import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{

    filmsTab=(event)=>{
        console.log(event.target);
        event.preventDefault();
        event.target.parentElement.children[1].classList.remove("header__navigation-active-item");
        event.target.classList.add("header__navigation-active-item");
        this.props.filmsTab();
    };

    bookmarksTab=(event)=>{
        console.log(event.target);
        event.preventDefault();
        event.target.parentElement.children[0].classList.remove("header__navigation-active-item");
        event.target.classList.add("header__navigation-active-item");
        this.props.bookmarksTab();
    };

    render(){
        return(
            <header className="header container">
                <nav className="header__navigation">
                    <a href="" className="header__navigation-item header__navigation-active-item" onClick={this.filmsTab}>Фильмы</a>
                    <a href="" className="header__navigation-item" onClick={this.bookmarksTab}>Закладки</a>
                </nav>
            </header>
        )
    }
}
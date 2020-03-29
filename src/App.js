import React, {Component} from 'react';
import Header from "./components/Header/Header";
import SearchBlock from './components/SearchBlock/SearchBlock';
import FilmsList from './components/FilmsList/FilmsList';
import './App.css';
import films from './films.json';

export default class App extends Component{

    state={
        films: films,
        bookmarks:[],
        page: "filmsList"
    };

    componentDidMount() {
        if(localStorage.getItem("bookmarks")!==null){
            console.log(localStorage.getItem("bookmarks")!==null);
            this.setState({
                bookmarks: JSON.parse(localStorage.getItem("bookmarks"))
            });
        }
    }

    filmsTab = ()=>{
        this.setState({
            page: "filmsList"
        });
    };

    bookmarksTab = ()=>{
        this.setState({
            page: "bookmarksList"
        });
    };

    updateFilms = (arr) =>{
        this.setState({
            films: arr
        })
    };

    updateBookmarks =(bookmarks)=>{
        console.log(bookmarks);
        this.setState({
            bookmarks
        })
    };

    render() {

        let filmsList;
        if(this.state.page=="filmsList"){
            filmsList=this.state.films;
        }else{
            filmsList=this.state.bookmarks;
        }

        return (
            <div className="App">
                <Header filmsTab={this.filmsTab} bookmarksTab={this.bookmarksTab}/>
                <SearchBlock updateFilms={this.updateFilms} page={this.state.page}/>
                <FilmsList films={filmsList} updateBookmarks={this.updateBookmarks} bookmarks={this.state.bookmarks} updateFilms={this.updateFilms}/>
            </div>
        );
    }
}
import React, {Component} from 'react';
import './films-list.css';

export default class FilmsList extends Component{

    state={
        showQuantity: 15
    };

    render(){

        const star = <svg className="films-list__add-bookmarks-star" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 426.667 426.667" enableBackground="new 0 0 426.667 426.667;" xmlSpace="preserve">
        <polygon fill="#A9A9A9" points="213.333,10.441 279.249,144.017 426.667,165.436 320,269.41 345.173,416.226 213.333,346.91
    81.485,416.226 106.667,269.41 0,165.436 147.409,144.017 "/>
    <g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>


        const showMore = (event)=>{
            event.preventDefault();
            this.setState({
                showQuantity:this.state.showQuantity+15
            });
        };

        let bookmarks = this.props.bookmarks;


        const addBookmark =(value)=>{
            bookmarks.push(this.props.films.find(el=>{return el.title==value}));
            localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
            this.props.updateBookmarks(bookmarks);
            this.props.updateFilms(this.props.films);
        };

        const removeBookmark = (value)=>{
            let index = bookmarks.findIndex(el=>{return el.title==value});
            bookmarks.splice(index,1);
            localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
            this.props.updateBookmarks(bookmarks);
        };

        const addToBookmarks=(event)=>{
            event.preventDefault();
            if(event.currentTarget.parentElement.classList.contains('films-list__bookmarks')){
                removeBookmark(event.currentTarget.parentElement.children[0].textContent);
            }else{
                addBookmark(event.currentTarget.parentElement.children[0].textContent);
            }
        };

        const checkBookmarks = (value)=> {
            let result = this.props.bookmarks.findIndex(el=>{return el.title==value}) > -1;
            return result;
        };


        const renderFilms=(arr)=>{

            return arr.map((item,i)=>{
                if(i<this.state.showQuantity){
                    let filmItem;
                    if(checkBookmarks(item.title)){
                        filmItem=<div key={i} className="films-list__film films-list__bookmarks">
                            <p className="film-list__film-name">
                                {item.title}
                            </p>
                            <a href="" className="films-list__add-bookmarks" onClick={addToBookmarks}>
                                {star}
                            </a>
                        </div>
                    }else{
                        filmItem = <div key={i} className="films-list__film">
                            <p className="film-list__film-name">
                                {item.title}
                            </p>
                            <a href="" className="films-list__add-bookmarks" onClick={addToBookmarks}>
                                {star}
                            </a>
                        </div>
                    }
                    return(
                        filmItem
                    );
                }
            })
        };

        let showMoreButton;

        if(this.state.showQuantity<this.props.films.length){
            showMoreButton=<a href="" onClick={showMore} className="films-list__show-more">Показать ещё</a>;
        }else{
            showMoreButton="";
        }

        return(
            <section className="films-list container">
                {renderFilms(this.props.films)}
                {showMoreButton}
            </section>
        )
    }
}
import React, {Component} from 'react';
import './search-block.css';
import Tags from './Tags/Tags';
import tags from "../../tags";
import films from "../../films";

export default class SearchBlock extends Component{

    state={
        activeTags: tags
    };

    componentDidMount() {
        console.log(this.state.activeTags);
        this.filterFilms(this.state.activeTags);
    }


    updateActiveTags=(activeTags)=>{
        this.setState({
            activeTags
        });
        this.filterFilms(activeTags);
    };

    filterToTags = (arr1, arr2)=>{
      return arr1.filter(item => {
         for(let i=0; i<item.tags.length; i++){
             if(arr2.indexOf(item.tags[i])>-1){
                 return item;
             }
         }
      });
    };

    filterToQuery = (query,arr)=> {
        if(query.length>0){
            return arr.filter(function(el) {
                return el.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
        }else{
            return(arr);
        }
    };

    filterFilmsPototype = (query, films, activeTags)=>{
        let useFilms=[];
        if(activeTags.length>0){
            useFilms = this.filterToTags(films, activeTags);
        }else{
            useFilms = films;
        }
        if(query.length>0){
            return(
                this.filterToQuery(query, useFilms)
            )
        }else{
            return useFilms;
        }
    };

    filterFilms=(activeTags)=>{
        let query = document.querySelector('.search-block__search-field').value;
        this.updateFilms(this.filterFilmsPototype(query, films, activeTags));
    };

    queryInitFilterFilms = ()=>{
        this.filterFilms(this.state.activeTags);
    };

    updateFilms=(arr)=>{
        this.props.updateFilms(arr);
    };

    render(){

        let searchBlockClass;
        if(this.props.page!="bookmarksList"){
            searchBlockClass="search-block";
        }else{
            searchBlockClass="search-block_not-active";
        }

        return(
            <section className={searchBlockClass + " " + "container"}>
                <input className="search-block__search-field" placeholder="Введите название фильма..." onInput={this.queryInitFilterFilms}></input>
                <Tags tags={tags} activeTags={this.state.activeTags} updateActiveTags={this.updateActiveTags}/>
            </section>
        )
    }
}
import React, {Component} from 'react';

export default class Tags extends Component{

    render(){

        let activeTagsArr = this.props.activeTags;

        const activateTag=(event)=>{
            event.preventDefault();
            if(event.target.classList.contains('search-block__active-tag')){
                event.target.classList.remove('search-block__active-tag');
                activeTagsArr.splice(activeTagsArr.indexOf(event.target.textContent),1);
                if(activeTagsArr.length==0){
                    activeTagsArr=this.props.tags;
                }
            }else{
                event.target.classList.add('search-block__active-tag');
                if(activeTagsArr.length!==this.props.tags.length){
                    activeTagsArr.push(event.target.textContent);
                }else{
                    activeTagsArr=[event.target.textContent];
                }
            }
            console.log(activeTagsArr);
            this.props.updateActiveTags(activeTagsArr);
        };

        const renderTags = (arr)=>{
            return arr.map((item, i)=>{
                return(
                    <a key={i} href="" className="search-block__tag" onClick={activateTag}>{item}</a>
                )
            })
        };

        return(
            <div className="search-block__tags">
                {renderTags(this.props.tags)}
            </div>
        )
    }
}
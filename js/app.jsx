import React from 'react';
import ReactDOM from 'react-dom';
import "./../sass/style.scss"


document.addEventListener('DOMContentLoaded', function () {
    let kitties = [
        {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
        {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
        {category: "male", age: "2", likesKids: false, name: "Grumpy"},
        {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
        {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
        {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
    ];

    class App extends React.Component {
        constructor(props){
            super(props);
            this.state={
                filterText:'',
                likesKids:false
            }
        }

        handleCheckbox=()=>{
            this.setState({
                likesKids:!this.state.likesKids
            })
        };
        handleText=(e)=>{
            this.setState({
                filterText:e.target.value
            })
        };

        render() {
            console.log(this.state.likesKids);
            return(
                <div className='app'>
                    <SearchBar text={this.handleText} checkbox={this.handleCheckbox} filterText={this.state.filterText} likesKids={this.state.likesKids}/>
                    <CatTable filterText={this.state.filterText} likesKids={this.state.likesKids} kitties={this.props.kitties} />
                </div>
            );
        }
    }


    class SearchBar extends React.Component {
        handleCheckbox=(e)=>{
            if(typeof this.props.checkbox==='function'){
                this.props.checkbox()
            }
        };
        handleText=(e)=>{
            if(typeof this.props.text==='function'){
                this.props.text()
            }
        };


        render() {
            return <form className='search'>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.props.text}/><p>
                <input type="checkbox" onChange={this.handleCheckbox} value={this.props.likesKids}/> Only show kitties that likes kids</p></form>;
        }
    }

    class CatTable extends React.Component{

        render(){
            let rows = [];
            let lastCategory = null;
            this.props.kitties.forEach((kitty)=> {
                if (kitty.category !== lastCategory ) {
                    rows.push(<CatCategoryRow category= {kitty.category}  key= { kitty.category } />);
                }

                if(kitty.name.indexOf(this.props.filterText)===0&&this.props.likesKids===false){
                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                    lastCategory = kitty.category;
                }else if(kitty.name.indexOf(this.props.filterText)===0&&this.props.likesKids===true&& kitty.likesKids===true){
                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                    lastCategory = kitty.category;
                }else if(kitty.name.indexOf(this.props.filterText)>0&&this.props.likesKids===false && kitty.filterText.indexOf(this.props.filterText)){
                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                    lastCategory = kitty.category;
                }else if(kitty.name.indexOf(this.props.filterText)>0&&this.props.likesKids===true && kitty.likesKids===true&& kitty.filterText.indexOf(this.props.filterText)){
                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                    lastCategory = kitty.category;
                }

                /*

                if (this.props.filterText.length===0){
                    if(kitty.likesKids&&this.props.likesKids===true){
                        rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                        lastCategory = kitty.category;
                    }else if(this.props.likesKids===false){
                        rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                        lastCategory = kitty.category;
                    }
                }else{
                    if(this.props.likesKids===true&&this.props.likesKids.indexOf(this.props.filterText)){
                        rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                        lastCategory = kitty.category;
                    }else if(this.props.likesKids===false){
                        rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                        lastCategory = kitty.category;
                    }
                }
                */
            });

            return (
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )
        }
    }

    class CatRow extends React.Component {
        render() {
            let name = this.props.kitty.likesKids ?
                this.props.kitty.name : <span style={{color: 'red'}}> {this.props.kitty.name} </span>;
            return (
                <tr>
                    <td className='names'>{name}</td>
                    <td className='names'>{this.props.kitty.age}</td>
                </tr>
            );
        }
    }
    class CatCategoryRow extends React.Component {
        render() {
            return (
                <tr>
                    <th className='rowSex' colSpan="2">{this.props.category}</th>
                </tr>
            );
        }
    }
    ReactDOM.render(
        <App kitties={kitties} />,
        document.getElementById('app')
    );


});

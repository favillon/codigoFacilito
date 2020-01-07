import React from 'react';

export default class Author extends React.Component{
    render() {
        return(
            <footer>
                <div>
                    <p>favillon &lt;favillon@hotmail.com&gt;</p>
                    <p><a target="_blank" href="https://github.com/favillon" rel="noopener noreferrer">Github</a></p>
                    {this.props.dateSite}
                </div>
            </footer>
        );
    }    
}

export function dateSite(){
    let d = new Date();    
    let dateInit = 2019;

    return(
        <p>{viewDate()}</p>        
    );    

    function viewDate(){
        if (dateInit === d.getFullYear()){
            return dateInit;
        } else {
            return dateInit + ' - ' + d.getFullYear() ;
        }
    }
}
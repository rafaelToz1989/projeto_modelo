import React, { Component } from 'react';
import ApiUsers from '../../api/ApiUsers';
import CustomTable from '../Secure/CustomTable/CustomTable';


class Requests extends Component {

     title = "Solicitações";
     emptyMsg = "Não há dados a serem exibidos.";


    constructor(props) {
        super(props)

      
        this.state = {
            data: [],
            errorMsg:""
        };
    }

    componentDidMount(){
        
        ApiUsers.getHelpiesByUserId((response) => {
            this.setState({ data: response})
        }, (error) => {
            this.setState({ errorMsg: error.message })
        })
    }

   
    render() {

        

        const header =(
            <tr>
                <th></th>
                <th>#</th>
                <th>Resumo</th>
                <th>Especialidade</th>
                <th>Status</th>
            </tr>
        )
           

        var body = this.state.data.map(item => {
            var privacy = item.private ? 'https': 'public';

            var status = item.status === 'AVAILABLE' ? 'Em andamento': 'Concluído';
            

            return <tr key={item.id}>
                <td><i className="material-icons md-18" style={{verticalAlign: "middle", lineHeight: "30px", height: "30px"}}>{privacy}</i></td>
                <td>{item.id}</td>
                <td>{item.subject}</td>
                <td>{item.skill.name}</td>
                <td>{status}</td>
            </tr>
        })

        body = <tbody>{body}</tbody>



    return (
        <div className="home">
            <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true}/>
        </div>
    )

}
}

export default Requests
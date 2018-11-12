import React from 'react'
import { Table } from 'reactstrap'
import BaseComponent from '../Base/BaseComponent';

class CustomTable extends BaseComponent {

    state = {
        header: '',
        body: '',
        emptyMsg: 'Sem registros',
        errorMsg: '',
        loading: true
    }

    constructor(props) {
        super()
        this.state.header = props.header
        this.state.body = props.body
        this.state.emptyMsg = props.emptyMsg
        this.state.loading = props.loading
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ header: nextProps.header, body: nextProps.body, loading: false });
    }


    render() {
        var body = null
        var footer = null
        if (this.state.loading) {
            footer =
                <tr>
                    <td colSpan="20">
                        <div style={{ textAlign: "center" }}>
                            <i className="fa fa-spinner fa-spin fa-2x" />
                            <i>Carregando</i>
                        </div>
                    </td>
                </tr>
        }

        if (this.state.errorMsg !== '') {
            body = this.state.errorMsg
        } else if (this.state.body === '') {
            body = this.state.emptyMsg
        } else {
            body = this.state.body
        }

        return <div>
            <div className="header-section-login">
                <h1 className="title-table"> {this.props.title !== null ? this.props.title : ""} </h1>
            </div>
            <div className="content-tables">
                <Table className="table table-hover table-striped" responsive>
                    <thead>
                        {this.state.header}
                    </thead>
                    {body}
                    <tfoot>
                        {footer}
                    </tfoot>
                </Table>
            </div>
        </div>
    }
}

export default CustomTable

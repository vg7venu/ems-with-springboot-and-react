import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

// Ant design imports
import { Button } from 'antd';
import 'antd/dist/antd.css';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then( response => {
            this.setState({employees : this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    componentDidMount() { 
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data})
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Employees List</h2>
                <br></br>
                <div className="row">
                    <Button type="primary" floated="right" onClick={this.addEmployee}>Add Employee</Button>
                </div>
                <br></br>
                <div className = "row">
                    <table className ="table table-striped table-bordered">
                        <thead>
                            <tr className = "text-center">
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id} className = "text-center">
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <Button type = "primary" onClick = { () => this.editEmployee(employee.id)}>Update</Button>
                                            <Button type = "default" style={{marginLeft : "10px"}} onClick = { () => this.viewEmployee(employee.id)}>View</Button>
                                            <Button type = "danger" style={{marginLeft : "10px"}} onClick = { () => this.deleteEmployee(employee.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;
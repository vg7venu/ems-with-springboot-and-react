import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

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
            this.setState({employees : this.state.employee.filter(employee => employee.id !== id)});
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
                <div className = "row">
                    <button className = "btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
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
                                    <tr key = {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button onClick = { () => this.editEmployee(employee.id)} className = "btn btn-info">Update</button>
                                            <button style={{marginLeft : "10px"}} onClick = { () => this.viewEmployee(employee.id)} className = "btn btn-info">View</button>
                                            <button style={{marginLeft : "10px"}} onClick = { () => this.deleteEmployee(employee.id)} className = "btn btn-danger">Delete</button>
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
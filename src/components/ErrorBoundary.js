import { Component } from "react";

export class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error){
        return{
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo){
        console.log("Logging:", error, errorInfo)
    }

    render(){
        console.log("hasError :" , this.state.hasError);
        if(this.state.hasError){
            return <h1>Something Went Wrong</h1>
        }
        return this.props.children
        
    }
}


export default ErrorBoundary
import React from 'react'
import { Field, reduxForm } from 'redux-form'


class StreamForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}
                    </div>
                </div>
            )
        }
    }


    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }



    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} action="" className="ui form error">
                    <Field name="title" label="Title" component={this.renderInput} />
                    <Field name="description"
                        label="Description"
                        component={this.renderInput} />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>

        )
    }
}


const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'Please enter a title'
    }
    if (!formValues.description) {
        errors.description = 'Please enter a description'
    }

    return errors
}


export default reduxForm({
    form: 'StreamForm',
    validate: validate
})(StreamForm);


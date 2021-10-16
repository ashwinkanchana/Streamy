import React from 'react'
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';
import history from '../../history';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }


    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
        history.push('/')
    }

    render() {
        if (!this.props.stream) {
            return (<div>Loading...</div>)
        }
        return (
            <div className="ui container">
                <h3>Edit the Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream,
                        'title', 'description')}
                    onSubmit={this.onSubmit} />
            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream,
    editStream
})(StreamEdit);